const jwt = require('jsonwebtoken');
const { asyncHandler } = require("../helpers/asyncHandler");
const { AuthFailureError, NotFoundError } = require('../core/error.response');
const { findByUserId } = require('../services/keyToken.service');

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        //privateKey sign token
        // publickey verify token
        // accessToken
        // khi logout xóa public key luôn
        // chuẩn thì phải logout thì em cũng phải xác định đúng đối tượng không rồi mới cho logout... Rồi xóa luôn
        // phương pháp này không lưu privateKey ở database chưa hiểu lắm
        // với rsa trên server vẫn phải lưu refresh token và privateKey ở database
        console.log('payload', payload)
        console.log('publicKey', publicKey)
        console.log('privateKey', privateKey)
        const accessToken = jwt.sign(payload, publicKey, {
            // algorithm: 'RS256',
            expiresIn: '2d'
        })

        const refreshToken = jwt.sign(payload, privateKey, {
            // algorithm: 'RS256',
            expiresIn: '7d'
        })

        // test
        // jwt.verify(accessToken, publicKey, (err, decoded) => {
        //     if(err) {
        //         console.log(`err verify: ${err}`)
        //     }

        //     console.log(`decoded: ${JSON.stringify(decoded)}`)
        // })

        // để test thử
        // jwt.verify(accessToken, privateKey, (err, decoded) => {
        //     if(err) {
        //         console.log(`err verify: ${err}`)
        //     }

        //     console.log(`decoded: ${JSON.stringify(decoded)}`)
        // })

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        console.log('error createTokenPair');
        console.error(error)
    }
}

const authentication = asyncHandler(async (req, res, next) => {
    // 1 - check userId missing
    // 2 - get accessToken
    // 3 - verify accessToken
    // 4 - check user in db
    // 5 - check keyStore with this userId
    // 6 - oOK all => next()

    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) {
        throw new AuthFailureError('Authentication Error')
    }

    console.log(111111111111111111111)
    const keyStore = await findByUserId(userId);
    console.log(2222222222222222222222)
    if (!keyStore) {
        throw new NotFoundError('Notfound KeyStore')
    }
    console.log(3333333333333333333333, req.headers)
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) {
        throw new AuthFailureError('Authentication Error')
    }

    try {
        const decoded = jwt.verify(accessToken, keyStore.publicKey);
        if(userId !== decoded.userId) {
            throw new AuthFailureError('Authentication Error')
        }

        req.keyStore = keyStore;
        return next()
    } catch (error) {
        throw error
    }
})

module.exports = {
    createTokenPair,
    authentication,
}