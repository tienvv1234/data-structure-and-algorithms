const { Created, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
    logout = async (req, res, next) => {
        new SuccessResponse({
            message: 'Logout success',
            metadata: await AccessService.logout(req.keyStore),
        }).send(res);
    }

    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body),
        }).send(res);
    }

    signUp = async(req, res, next) => {
        console.log(`[P]:: signUp ${req.body}`);
        // const createShop = await AccessService.signUp(req.body);
        // return res.status(201).json(createShop);
        new Created({
            message: 'Shop created',
            metadata: await AccessService.signUp(req.body),
            option: {
                limit: 10, // ví dụ
            }
        }).send(res);
    }
}

module.exports = new AccessController();