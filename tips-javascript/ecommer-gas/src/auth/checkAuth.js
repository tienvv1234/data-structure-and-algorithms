const { findById } = require("../services/apiKey.service");

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'Authorization',
}
const apiKeys = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY];
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden Error',
            })
        }

        const objKey = await findById(key);
        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden Error',
            })
        }

        req.objKey = objKey;
        
        return next()
    } catch (error) {
        console.error(error);
    }
}

const permission = (permission) => {
    // closure là trả về  function bên trong function
    // và nó dùng đước tham số của function cha
    return (req, res, next) => {
        if(!req.objKey.permissions) {
            return res.status(403).json({
                message: 'Forbidden denied',
            })
        }

        const validPermission = req.objKey.permissions.includes(permission);
        if(!validPermission) {
            return res.status(403).json({
                message: 'Forbidden denied',
            })
        }

        return next();
    }
}

module.exports = {
    apiKeys,
    permission
}