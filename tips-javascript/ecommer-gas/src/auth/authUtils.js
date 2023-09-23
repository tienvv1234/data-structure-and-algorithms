const jwt = require('jsonwebtoken');
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

module.exports = {
    createTokenPair,
}