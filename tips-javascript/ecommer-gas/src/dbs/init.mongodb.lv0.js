const mongose = require('mongoose');

const connectString = 'mongodb://localhost:27120/ecommer-gas';
mongose.connect(connectString).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

mongose.set('debug', true);
mongose.set('debug', {
    color: true
});

module.exports = mongose;