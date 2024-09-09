const express = require('express');
const app = express();
// const session = require('express-session');
const jwt = require('jsonwebtoken');
let userCount = 0; 
const userAccessSet = new Set(); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 300000 } // 3 minutes
// }));

// function waitMiddleware(req, res, next) {
//     console.log('waitMiddleware');
//     userCount++; // Increment user count for each request to the event API
//     if (userCount <= 300) {
//         // If there are less than 300 users, proceed to the event
//         return next();
//     }

//     if (!req.session.waitUntil) {
//         console.log('Setting waitUntil');
//       req.session.waitUntil = Date.now() + 18000; // sets the wait time to 3 mins in the future
//     }
    
//     if (Date.now() < req.session.waitUntil) {
//         console.log('Wait time has not');
//       // User should be waiting, send them to the wait page
//       return res.redirect('http://localhost:3000/wait');
//     }
    
//     console.log('Wait time has passed');
//     // If the wait time has passed, proceed to the event
//     next();
// }

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // Assume token is in the Authorization header

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        //const decoded = jwt.verify(token, JWT_SECRET);
        const decoded = jwt.decode(token);
        req.user = decoded;
        req.waitUntil = req.waitUntil ? req.waitUntil : Date.now() + 18000; // 3 minutes
        // if (!userAccessSet.has(userId)) {
        //     userAccessSet.add(userId);
        //     userCount++;
        // }
        userCount++;
        if (userCount > 300 && Date.now() < req.waitUntil) {
            return res.status(503).send('Server is busy, please try again later');
        }
        else {
            return next();
        }
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
};


app.get('/event',
    // waitMiddleware, 
    verifyToken,
    (req, res) => {
    console.log('Event page');
    res.send('Event page');
    // Serve the event page content
});

app.listen(3001, () => {
    console.log('Example app listening on port 3000!');
});