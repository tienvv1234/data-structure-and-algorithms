const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

// middleware
app.use(morgan('dev'));
app.use(helmet())
app.use(compression())

// init db
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');

checkOverload()
// routes
app.get('/', (req, res) => {
    const str = 'Hello World';

    return res.status(200).json({
        message: str.repeat(10000)
    })
})

module.exports = app;