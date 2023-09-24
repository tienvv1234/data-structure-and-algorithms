const keytokenModel = require("../models/keytoken.model");
const { Types } = require('mongoose');
class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            // level 0
            // const tokens = await keytokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            // });

            // return tokens ? tokens.publicKey : null;

            // level 1
            const filter = {
                user: userId,
            };
            const options = {
                upsert: true,
                new: true
            };// chưa có insert có rồi thì update
            const update = {
                publicKey,
                privateKey,
                refreshTokenUsed: [],
                refreshToken,
            };
            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options)
             return tokens ? tokens.publicKey : null;

        } catch (error) {
            return error;
        }
    }

    static findByUserId = async (userId) => {
        return await keytokenModel.findOne({ user: new Types.ObjectId(userId) }).lean();
    }

    static removeKeyById = async (keyId) => {
        return await keytokenModel.deleteOne({ _id: new Types.ObjectId(keyId) });
    }
}

module.exports = KeyTokenService;