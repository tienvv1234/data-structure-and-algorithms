const express = require('express');
const app = express();

app.get('/', (req, res) => {
    logicsPromise();    
});

function sendMail() {
    return new Promise((resolve, reject) => {
        const error = new Error("too many requests");
        error.stateCode = 429;
        reject(error);
    });

}

async function tryCatchAndLog() {
    try {
      await sendMail();
    } catch (error) {
      console.error("Caught an error:111", error);
    }
}
  
async function logicsPromise() {
    try {
        tryCatchAndLog();
        console.log("After the promise call, it will not wait for the promise to resolve or reject.");
    } catch (error) {
        console.error("Caught an error:", error);
    }
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// const express = require('express');
// const app = express();
// const port = 3111;

// const { Router } = express;
// const router = Router();

// // Define AppError class
// class AppError extends Error {
//   constructor(message, statusCode, isLog = true) {
//     super(message);
//     this.statusCode = statusCode;
//     this.isLog = isLog;
//   }
// }

// function promisedFunction() {
//   return new Promise((resolve, reject) => {
//     const error = new AppError('Too many requests', 429, false);
//     reject(error);
//   });
// }

// async function callPromiseWithoutCatch() {
//   try {
//     promisedFunction();
//     console.log('After promise call');
//   } catch (err) {
//     console.log('Catch', err);
//   }
// }

// const errorLogger = (err, req, res, next) => {
//   if (err instanceof AppError && err.isLog === false) {
//     next(err); // calling next middleware
//   } else {
//     console.log('errorLogger', err);
//     next(err); // calling next middleware
//   }
// };

// const errorResponder = (err, req, res, next) => {
//   res.setHeader('Content-Type', 'application/json');
//   const status = err.statusCode || 500;
//   res.status(status).json({ error: err.message });
// };

// // Use the middleware in the correct order
// app.use(router);
// router.use(errorLogger);
// router.use(errorResponder);

// app.get('/', async (req, res, next) => {
//   try {
//     await callPromiseWithoutCatch();
//     res.send('Hello, Welcome to the Express starter template for Stackblitz!');
//   } catch (err) {
//     next(err);
//   }
// });

// app.listen(port, () => {
//   console.log('sdfa');
// });