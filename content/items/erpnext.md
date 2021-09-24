---
title: "centos8 install erpnext"
date: 2021-06-27
draft: false
---

### 系统源配置
```bash
dnf update -y
yum install https://mirrors.aliyun.com/epel/epel-release-latest-8.noarch.rpm -y 
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
mv /etc/yum.repos.d/epel.repo /etc/yum.repos.d/epel.repo.backup
mv /etc/yum.repos.d/epel-testing.repo /etc/yum.repos.d/epel-testing.repo.backup
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-8.repo
sed -i 's|^#baseurl=https://download.fedoraproject.org/pub|baseurl=https://mirrors.aliyun.com|' /etc/yum.repos.d/epel*
sed -i 's|^metalink|#metalink|' /etc/yum.repos.d/epel*
sed -i '$a\fastestmirror=True' /etc/dnf/dnf.conf

touch /etc/yum.repos.d/MariaDB.repo
echo [mariadb] > /etc/yum.repos.d/MariaDB.repo
echo name = MariaDB >> /etc/yum.repos.d/MariaDB.repo
echo baseurl = https://mirrors.aliyun.com/mariadb/yum/10.5/centos8-amd64 >> /etc/yum.repos.d/MariaDB.repo
echo module_hotfixes=1 >> /etc/yum.repos.d/MariaDB.repo
echo gpgkey= https://mirrors.aliyun.com/mariadb/yum/RPM-GPG-KEY-MariaDB >> /etc/yum.repos.d/MariaDB.repo
echo gpgcheck=1 >> /etc/yum.repos.d/MariaDB.repo

dnf clean all
dnf makecache
```

### 系统配置
```bash
dnf group install "Development Tools" -y
sed -i '/SELINUX/s/enforcing/disabled/' /etc/selinux/config  && setenforce 0 
firewall-cmd --zone=public --add-port=80/tcp
firewall-cmd --zone=public --add-port=443/tcp
firewall-cmd --zone=public --add-port=8000/tcp
firewall-cmd --runtime-to-permanent

useradd -m erp -G wheel
sed -i 's/^#\s*\(%wheel\s\+ALL=(ALL)\s\+NOPASSWD:\s\+ALL\)/\1/' /etc/sudoers
echo "vm.overcommit_memory = 1" | sudo tee -a /etc/sysctl.conf
echo "echo never > /sys/kernel/mm/transparent_hugepage/enabled" | sudo tee -a /etc/rc.d/rc.local
chmod 755 /etc/rc.d/rc.local 
reboot
```
### 安装数据库
```bash
dnf install MariaDB MariaDB-server MariaDB-client --disablerepo=AppStream -y
```
###  配置erpnext数据库
```bash
cat <<EOF >/etc/my.cnf.d/erpnext.cnf
[mysqld]
innodb-file-format=barracuda
innodb-file-per-table=1
innodb-large-prefix=1
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

[mysql]
default-character-set = utf8mb4
EOF
```
### 初始化数据库
```bash
systemctl enable mariadb && systemctl start mariadb
mysql_secure_installation   #回车 n y 密码 y y y y
```
### 安装依赖组件
```bash
dnf install gcc make git nginx python3 python3-devel python2 python2-devel redis boost-program-options -y
​```bash

​```bash
dnf install nodejs -y 
node --version
npm config set registry https://registry.npm.taobao.org npm info underscore
npm config get registry
npm install -g yarn
```
```bash
wget https://bootstrap.pypa.io/get-pip.py
python3 get-pip.py
pip -V
pip3 install supervisor -i https://pypi.tuna.tsinghua.edu.cn/simple/ --trusted-host pypi.tuna.tsinghua.edu.cn
```
### 安装ERPNext
```bash
su erp
cd
pip3 install --user frappe-bench -i https://pypi.tuna.tsinghua.edu.cn/simple/ --trusted-host pypi.tuna.tsinghua.edu.cn
export http_proxy='http://192.168.1.2:1081'
export https_proxy='http://192.168.1.2:1081'
bench init frappe-bench --frappe-branch version-12
```
### 配置ERPNext
启动frappe开发服务器和创建新站点
```bash
cd frappe-bench
sed -i '/web:/ s/$/ --noreload/' Procfile
bench start >/tmp/bench_log &

bench new-site your ip
```
### 安装ERPNext应用
```bash
bench get-app erpnext --branch version-12
bench install-app erpnext
bench start >/tmp/bench_log &
bench update
```
### 测试
默认用户名administrator
如果出现问题
```bash
cd /home/erp/frappe-bench/apps/frappe
git stash 
git reset --hard
git pull --rebase
cd /home/erp/frappe-bench
bench update --reset
```