const express = require('express');
const app = express();
const mysql = require('mysql2');

// wrong connection config
function getConnection() {
    return mysql.createPool({
        host: 'localhost',
        port: 3307,
        user: 'test',
        password: 'testpass',
        database: 'test',
        connectionLimit: 10,
    })
}

app.get('/', (req, res) => {
    const pool = getConnection(); // each request will create a new connection
    conn.query('SELECT * FROM users limit 10', (err, rows) => {
        if (err) console.log(err);
        res.send(rows[0]);
        conn.end(); // each request ends the connection if not close it, it will still open with command is sleep
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})