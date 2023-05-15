docker run --name mongoDev -p 27111:27017 --net my-mongo-cluster -d mongo:latest

explain in mongodb

db.collection.find().explain()
db.stackoverflow.find({blogId: 1}).skip(200).limit(50).explain('executionStats')

vs
db.hacknews.find({blogId: 1, commentId: { $gt: 200}}).limit(50).explain('executionStats')

without index it will do a full table scan and return all the results (250 records)

with index it will do a index scan and return only the results (50 records)

db.stackoverflow.getIndexes()

index to stackoverflow collection
db.stackoverflow.createIndex({ blogId: 1})

index to hacknews collection
db.hacknews.createIndex({ blogId: 1, commentId: 1})

-----------------------------------------------

stackoverflow will using index to find the records but still return all the records (250 records)
db.stackoverflow.find({blogId: 1}).skip(200).limit(50).explain('executionStats')

vs

hacknews will using index to find the records and return only the results (50 records)
db.hacknews.find({blogId: 1, commentId: { $gt: 200}}).limit(50).explain('executionStats')