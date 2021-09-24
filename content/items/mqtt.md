---
title: "mqtt"
date: 2021-08-25
draft: false
---

#### 发布订阅与主题设计

MQTT 协议中过滤规则即 Topic

MQTT 的 Topic 有层级结构，并且支持通配符 + 和 #：

- \+ 是匹配单层的通配符。比如 news/+ 可以匹配 news/sports，news/+/basketball 可匹配到 news/sports/basketball。
- \# 是一到多层的通配符。比如 news/# 可以匹配 news、 news/sports、news/sports/basketball 以及 news/sports/basketball/x 等等。

MQTT 的主题是不要预先创建的，发布者发送消息到某个主题、或者订阅者订阅某个主题的时候，Broker 就会自动创建这个主题。

#### 带宽最小化

MQTT 协议将协议本身占用的额外消耗最小化，消息头部最小只需要占用 2 个字节。
 
MQTT 的消息格式分三部分：

- 固定长度头部，2 个字节，所有消息类型都有
- 可变长度头部，部分消息类型有
- Payload, 部分消息类型有

MQTT 的主要消息类型有：

- CONNECT / CONNACK
- PUBLISH / PUBACK
- SUBSCRIBE / SUBACK
- UNSUBSCRIBE / UNSUBACK
- PINGREQ / PINGRESP
- DISCONNECT

其中 PINGREQ / PINGRESP 和 DISCONNECT 报文是不需要可变头部的，也没有 Payload，也就是说它们的报文大小仅仅消耗 2 个字节。
 
在 CONNECT 报文的可变长度头部里，有个 Protocol Version 的字段。为了节省空间，只有一个字节。所以版本号不是按照字符串 "3.1.1" 存放的，而是使用数字 4 来表示 3.1.1 版本


