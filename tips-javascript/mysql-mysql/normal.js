const express = require('express');
const app = express();
const mysql = require('mysql2');

function getConnection() {
    return mysql.createConnection({
        host: '127.0.0.1',
        port: 3307,
        user: 'test',
        password: 'testpass',
        database: 'test',
        insecureAuth: true,
    })
}

app.get('/', (req, res) => {
    const conn = getConnection();
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        conn.query('SELECT * FROM users limit 10', (err, rows) => {
            if (err) console.log(err);
            res.send(rows[0]);
            conn.end(); // each request ends the connection if not close it, it will still open with command is sleep
        });
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})