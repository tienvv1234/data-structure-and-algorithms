const apikeyModel = require("../models/apikey.model");
const crypto = require('crypto');
const findById = async (key) => {
    console.log('key', key)
    const newKey = await apikeyModel.create({
        key: crypto.randomBytes(24).toString('hex'),
        permissions: ['0000']
    });
    console.log('newKey', newKey)
    const objKey = await apikeyModel.findOne({
        key,
        status: true,
    }).lean();

    return objKey;
}

module.exports = {
    findById,
}