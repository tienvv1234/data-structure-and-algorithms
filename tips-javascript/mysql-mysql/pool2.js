const express = require('express');
const app = express();
const mysql = require('mysql2');

// function getConnection() {
//     return mysql.createPool({
//         host: '127.0.0.1',
//         port: 3307,
//         user: 'test',
//         password: 'testpass',
//         database: 'test',
//         connectionLimit: 10, // it create max 10 connection at a time
//     })
// }
// the pool will open one connection at a time while we noot call end or release connection and it not create a new connection
// if we call end or release connection, it will create a new connection

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3307,
    user: 'test',
    password: 'testpass',
    database: 'test',
    connectionLimit: 10,
});

app.get('/', (req, res) => {
    pool.getConnection((err, pool) => {
        if (err) {
            console.log(err);
            return;
        }
        pool.query('SELECT * FROM users limit 10', (err, rows) => {
            if (err) console.log(err);
            res.send(rows[0]);
        });
        pool.release();
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})