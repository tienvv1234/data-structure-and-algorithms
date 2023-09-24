const shopModel = require("../models/shop.model");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { findByEmail } = require("./shop.service");

const RoleShop = {
    SHOP: '0001',
    WRITE: '0002',
    EDITOR: '0003',
    ADMIN: '0004',
}

class AccessService {
    static logout = async (keyStore) => {
        return await KeyTokenService.removeKeyById(keyStore._id);
    }
    
    static login = async ({ email, password, refreshToken = null }) => {
        const foundShop = await findByEmail(email);
        if (!foundShop) {
            throw new BadRequestError('Error: Shop not found');
        }

        const isMatch = await bcrypt.compare(password, foundShop.password);
        if (!isMatch) {
            throw new AuthFailureError('Authentication Error');
        }

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const tokens = await createTokenPair({
            userId: foundShop._id,
            email,
        }, publicKey, privateKey);

        await KeyTokenService.createKeyToken({
            userId: foundShop._id,
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken
        })

        return {
            shop: getInfoData({ fields: ['_id', 'name', 'email'], object: foundShop }),
            tokens
        }
    }

    static signUp = async ({name, email, password}) => {
        try {
            // step 1: check email exists
            // lean() giảm thiểu data từ mongo từ mongo Object ra object javascript thuần
            const holderShop = await shopModel.findOne({ email: email }).lean();
            console.log('holderShop', holderShop);
            if (holderShop) {
                throw new BadRequestError('Error: Shop already exists');
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
                // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                //     modulusLength: 4096,
                //     publicKeyEncoding: {
                //         type: 'pkcs1', // public key cryptography standard 1
                //         format: 'pem'
                //     },
                //     privateKeyEncoding: {
                //         type: 'pkcs1', // private key cryptography standard 1
                //         format: 'pem'
                //     }
                // })

                // generate privateKey, publicKey
                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');
                console.log('privateKey', privateKey)
                console.log('publicKey', publicKey)
                // save collection keyStore
                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                });

                if (!keyStore) {
                    return {
                        code: 'xxxx',
                        message: 'create key token failed',
                    }
                }

                // const publicKeyObject = crypto.createPublicKey(publicKeyString);
                // create token pair
                const tokens = await createTokenPair({
                    userId: newShop._id,
                    email,
                }, publicKey, privateKey);

                console.log('tokens', tokens);
                
                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
                        tokens,
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }
        } catch (error) {
            console.log('error', error);
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService