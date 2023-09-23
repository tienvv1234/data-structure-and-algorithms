const express = require('express');
const { apiKeys, permission } = require('../auth/checkAuth');
const router = express.Router();

// check apiKey
router.use(apiKeys)
// check permission
router.use(permission('0000'))
router.use('/v1/api', require('./access'));
// router.get('', (req, res) => {
//     const str = 'Hello World';

//     return res.status(200).json({
//         message: str.repeat(10000)
//     })
// })

module.exports = router;