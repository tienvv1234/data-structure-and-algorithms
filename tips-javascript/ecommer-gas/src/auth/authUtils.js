const jwt = require('jsonwebtoken');
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        //privateKey sign token
        // publickey verify token
        // accessToken
        // khi logout xóa public key luôn
        // chuẩn thì phải logout thì em cũng phải xác định đúng đối tượng không rồi mới cho logout... Rồi xóa luôn
        // phương pháp này không lưu privateKey ở database chưa hiểu lắm
        const accessToken = jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2d'
        })

        const refreshToken = jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7d'
        })

        jwt.verify(accessToken, publicKey, (err, decoded) => {
            if(err) {
                console.log(`err verify: ${err}`)
            }

            console.log(`decoded: ${JSON.stringify(decoded)}`)
        })

        jwt.verify(accessToken, privateKey, (err, decoded) => {
            if(err) {
                console.log(`err verify: ${err}`)
            }

            console.log(`decoded: ${JSON.stringify(decoded)}`)
        })

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