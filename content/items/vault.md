---
title: "vault 的使用"
date: 2021-08-19
draft: false
---

#### 安装 vault 与 jq

```shell
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
sudo yum -y install vault

sudo yum install epel-release
sudo yum install jq -y
```


#### 初始化 Vault

下面的API请求可以对Vault进行初始化，两个参数的意思将master key分成几份以及还原，这里采用 1。

```shell
curl -X PUT -d "{\"secret_shares\":1, \"secret_threshold\":1}"  http://127.0.0.1:8200/v1/sys/init | jq
```

返回结果如下：

```json
{
  "keys": [
    "5370c6eb7678cbf3e90d0f540ae38642126f5f568fe411287294164f567fb546"
  ],
  "keys_base64": [
    "U3DG63Z4y/PpDQ9UCuOGQhJvX1aP5BEocpQWT1Z/tUY="
  ],
  "root_token": "s.qGjCQRpveLtOodP20xcqq4X3"
}
```

第一个是master key的public key，第二个是unseal key,最后一个是root token。unseal vault之后才能验证进行具体的操作。

```shell
curl -X PUT -d '{"key": "U3DG63Z4y/PpDQ9UCuOGQhJvX1aP5BEocpQWT1Z/tUY="}'  http://127.0.0.1:8200/v1/sys/unseal | jq
```

结果如下：

```json
{
  "type": "shamir",
  "initialized": true,
  "sealed": false,
  "t": 1,
  "n": 1,
  "progress": 0,
  "nonce": "",
  "version": "1.8.1",
  "migration": false,
  "cluster_name": "vault-cluster-65251bdd",
  "cluster_id": "0435131e-3c3a-0a14-564a-3cd6a71fbfa6",
  "recovery_seal": false,
  "storage_type": "file"
}
```

导出环境变量

```shell
export VAULT_ADDR=http://127.0.0.1:8200

export VAULT_TOKEN=s.qGjCQRpveLtOodP20xcqq4X3
```

在 pki 路径上启用 pki secrets 引擎。

```shell
vault secrets enable pki

# Success! Enabled the pki secrets engine at: pki/
```


#### HTTP API

##### Generate Certificate

  POST /pki/issue/:name

根据指定的角色生成一组新的凭据(私钥和证书)。同时也返回发出的 CA 证书，因此只有根 CA 需要在客户端的信任存储区中。

###### Parameters

- `name` `(string: <required>)`：指定要创建证书的角色的名称。这是请求 URL 的一部分
- `common_name` `(string: <required>)`：指定证书所请求的 CN。如果 CN 是角色政策允许的，它将被发布。