const shopModel = require("../models/shop.model");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");

const RoleShop = {
    SHOP: '0001',
    WRITE: '0002',
    EDITOR: '0003',
    ADMIN: '0004',
}

class AccessService {
    static signUp = async ({name, email, password}) => {
        try {
            // step 1: check email exists
            // lean() giảm thiểu data từ mongo từ mongo Object ra object javascript thuần
            const holderShop = await shopModel.findOne({ email: 'email' }).lean();
            if (holderShop) {
                return {
                    code: 'xxxx',
                    message: 'shop already exists',
                }
            }

            // step 2: create new shop
            const passwordHash = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHash,
                roles: [RoleShop.SHOP]
            });

            if (newShop) {
                // created privateKey, publicKey
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1', // public key cryptography standard 1
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1', // private key cryptography standard 1
                        format: 'pem'
                    }
                })
                console.log('privateKey', privateKey)
                console.log('publicKey', publicKey)
                // save collection keyStore
                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                });

                if (!publicKeyString) {
                    return {
                        code: 'xxxx',
                        message: 'create key token failed',
                    }
                }

                const publicKeyObject = crypto.createPublicKey(publicKeyString);
                // create token pair
                const tokens = await createTokenPair({
                    userId: newShop._id,
                    email,
                }, publicKeyObject, privateKey);

                console.log('tokens', tokens);
                
                return {
                    code: 201,
                    metadata: {
                        shop: newShop,
                        tokens,
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService