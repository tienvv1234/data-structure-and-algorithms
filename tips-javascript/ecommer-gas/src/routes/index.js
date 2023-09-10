const express = require('express');
const router = express.Router();

router.use('/v1/api', require('./access'));
// router.get('', (req, res) => {
//     const str = 'Hello World';

//     return res.status(200).json({
//         message: str.repeat(10000)
//     })
// })

module.exports = router;