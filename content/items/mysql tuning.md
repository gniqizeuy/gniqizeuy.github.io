---
title: "Mysql tuning"
date: 2021-04-12
draft: false
---


## Schema 与 数据类型优化

良好的**逻辑设计**和**物理设计**是高性能的基石，应该根据系统将要执行的**查询语句**来设计 schema

<!--more-->

### 1.1 选择优化的数据类型

以下几个原则可以提供参考

{{< details "更小的通常更好"  >}}
使用**最小数据类型**存储数据（例如只要存0～200，tinyint unsigned 更好)

更小的数据类型通常更快，占用更少的磁盘、内存和 CPU 缓存，并且处理时需要的 CPU 周期也更少。

但需确保低估需要存储的值的范围，因为在 schema 中的多个地方增加数据类型范围是一个非常耗时和痛苦的操作。如果无法确定哪个数据类型是最好的，就选择你认为不会超过范围的最小类型
{{< /details >}}

{{< details "简单就好" >}}
**简单数据类型**的操作通常需要更少的 CPU 周期。

例如，整形比字符操作代价更低，因为字符集和校对规则/排序规则是字符比较整形比较更复杂。举例：一个是使用 MySQL 内建的类型即 date,time,datatime 而不是字符串来存储日期和时间  
　　　另一个应该用整形存储 IP 地址
{{< /details >}}

{{< details "尽量避免 NULL" >}}

通常最好指定列为 **NOT NULL** ，除非真的需要存储 null 值

如果查询中包含 NULL 的列，对 MySQL 来说更难优化，可为 NULL 的列使得索引、索引统计和值比较都更复杂。

可为 NULL 的列会使用更多的存储空间，在 MySQL 中也需要特殊处理。当可为 NULL 的列被索引时，每个索引记录需要一个额外的字节，在 MyISAM 里甚至还可能导致固定大小的索引（例如只有一个整数列的索引）变成可变大小的索引

通常把可为 NULL 的列改为 NOT NULL 带来的性能提升比较小，所以（调优）没有必要首先在现有 schema 中查找并修改这种情况，除非这会导致问题。

但是，如果计划在列上建索引，就应该尽量避免设计成可为 NULL 的列。

在 InnoDB 中使用单独的 bit 存储 NULL 值，所以对于稀疏数据（很多值为 NULL，只有少数行的列有非 NULL 值）有很好的空间效率。但这一点不适用于 MyISAM。

{{< /details >}}

为列选择数据类型时，第一步需要**确定合适的大类型**：数字、字符串、时间等。

接着选择**具体类型**。很多数据类型可以存储相同类型的数据，但会有以下区别

- 允许的精度不同
- 存储的长度和范围不一样
- 需要的物理空间（磁盘和内存空间）不同

相同大类型的不同子类型数据有时也有一些特殊的行为和属性。

例如，DATATIME 和 TIMESTAMP 列都可以存储相同类型的数据：时间和日期，精确到秒。  
但 TIMESTAMP 只使用 DATATIME 一半的存储空间，且会根据时区变化，具有特殊的自动更新能力。  
另一方面，TIMESTAMP 允许的时间范围要小的多，有时候它的特殊能力会成为障碍。

MySQL 为了兼容性支持很多别名，例如 INTERGER、BOOL、以及 NUMERIC。它们都只是别名，不会影响性能。如果建表时采用数据类型的别名，然后用 `SHOW CREATE TABLE` 检查，会发现 MySQL 报告的是基本类型，而不是别名。

#### 1.1.1 整数类型

有两种类型的数字：整数和实数，存储整数可以使用这几种类型：

| TINYINT | SMALLINT | MEDIUMINT | INT    | BIGINT |
| ------- | -------- | --------- | ------ | ------ |
| 8 bit   | 16 bit   | 24 bit    | 32 bit | 64 bit |

存储的值范围从 $-2^{N-1}$ 到 $2^{N-1}-1$ 。N 是存储空间的位数

整数类型可选 UNSIGNED 属性，表示不允许负值，这大致可以使正数的上限提高一倍。

	例如，TINYINT UNSIGNED 可以存储的范围是 0 ~ 255，TINYINT 的存储范围是 -128 ~ 127。

有符号和无符号类型使用相同的存储空间，并具有相同的性能，因此可以根据实际情况选择合适的类型

你的选择决定 MySQL 是怎么在内存和磁盘中保存数据的。然而，整数计算一般使用 64 位的 BIGINT 整数，即使在 32 位环境中也是如此（一些聚合函数是例外，它们使用 DECIMAL 或 DOUBLE 进行计算）。

MySQL 可以为整数类型指定宽度，例如 INT(11)，它不会限制值得合法范围，只是规定了 MySQL 的一些交互工具（例如命令行客户端）用来显示字符的个数。对于存储和计算来说，INT(1) 和 INT(20) 是相同的。

> 一些第三方存储引擎，比如 Infobright，有时也有自定义的存储格式和压缩方案，并不一定使用常见的 MySQL 内置引擎方式

#### 4.1.2 实数类型

实数即带小数点的数字，然而并不只是为了存储小数部分，也可以用 DECIMA 存储比 BIGINT 大的整数

MySQL 既支持精确类型，也支持不精确类型