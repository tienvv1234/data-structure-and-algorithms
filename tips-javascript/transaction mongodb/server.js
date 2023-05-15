const mongoose = require('mongoose');
const app = require('./app');
const port = 3001;

mongoose.connect('mongodb://172.19.0.2:27017/test?directConnection=true&replicaSet=mongoRepSet')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
