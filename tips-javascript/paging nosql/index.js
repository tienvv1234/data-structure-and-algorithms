const express = require('express');
const app = express();
const controller = require('./controller');
const mongoose = require('mongoose');

mongoose.connect('mongodb://172.21.0.1:27111/test')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

app.use(express.json());

app.post('/insert1', controller.insertComments);

app.post('/inserts', controller.insertManyComments);

app.get('/list', controller.list);

app.get('/list2', controller.list2);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})