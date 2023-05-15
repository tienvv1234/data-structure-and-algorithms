install mysql on docker
```
docker run --name testmysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:latest --max-connections=1000
```
maxconnections: 1000 depends on your machine cpu

```
docker exec -it testmysql bash
mysql -uroot -p123456
show databases;
create user 'test'@'%' identified by 'testpass'; // create user % is localhost 
create database test;
grant all privileges on test.* to 'test'@'%';
flush privileges;
```
create table user with fields id, name, age
create table users (id int primary key, username varchar(100), age int);
insert into users (id, username, age) values (1, 'cr7', 37);

view connections

show max connection
```
show variables like 'max_connections';
```