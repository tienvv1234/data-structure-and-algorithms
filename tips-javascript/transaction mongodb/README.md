giải quyết bài toán Transaction DB Bank
rút tiền ở tài khoàn a và chuyển vào tk b

create network for mongo
docker network create mongoNet

create mongo container with name r0 (master)
docker run -d -p 27108:27107 --net mongoNet --name r0 mongo:latest --replSet mongoRepSet


create mongo container with name r1 (slave)
docker run -d -p 27109:27107 --net mongoNet --name r1 mongo:latest --replSet mongoRepSet

create mongo container with name r2 (slave)
docker run -d -p 27110:27107 --net mongoNet --name r2 mongo:latest --replSet mongoRepSet

r0 crash r1 replace r0 and read and write data 
r2 clone data and read data

```
docker exec -it r0 mongo
config = {"_id": "mongoRepSet", "members": [{_id:0, host: "192.168.58.1:27017"}, {_id: 1, host:"192.168.58.1:27017"}, {_id:2, host: "192.168.58.1:27017"}]}
rs.initiate(config)

db.getMongo().setReadPref("primaryPreferred")

connection string need to add replicaSet and directConnection=true
mongodb://172.19.0.2:27017/test?directConnection=true&replicaSet=mongoRepSet
```
ip trong container

kiểm tra ip của các container 
```
docker network inspect mongoNet | grep 'r\|IPv4Address'
```


way 2
step 1: create network for mongo
docker network create my-mongo-cluster
step 2: create mongo container with name mongo1, mongo2, mongo3
docker run --name mongo1 --net my-mongo-cluster mongo mongod --replSet my-mongo-set
docker run --name mongo2 --net my-mongo-cluster mongo mongod --replSet my-mongo-set
docker run --name mongo3 --net my-mongo-cluster mongo mongod --replSet my-mongo-set

step 3: get ip of container
docker network inspect my-mongo-cluster | grep 'mongo\|IPv4Address'

step 4: connect to mongo1 container
docker exec -it mongo1 mongo or mongo --host 172.21.0.2
 config = {
"_id": "my-mongo-set",
 "members": [
 {
 "_id": 0,
 "host": "mongo1:27017"
 },
 {
 "_id": 1,
 "host": "mongo2:27017"
 },
 {
 "_id":2,
 "host": "mongo3:27017"
 }
 ]
}


```
# docker-compose.yml file
version: "3.5"

services:
  mongo_one:
    container_name: mongo1
    image: mongo #should specify version mongo here
    command: mongod --replSet my-mongo-set

  mongo_two:
    container_name: mongo2
    image: mongo #should specify version mongo here
    command: mongod --replSet my-mongo-set

  mongo_three:
    container_name: mongo3
    image: mongo #should specify version mongo here
    command: mongod --replSet my-mongo-set

networks:
  default:
    external:
      name: my-mongo-cluster
```

