const AccessService = require("../services/access.service");

class AccessController {
    signUp = async(req, res, next) => {
        console.log(`[P]:: signUp ${req.body}`);
        const createShop = await AccessService.signUp(req.body);
        return res.status(201).json(createShop);
    }
}

module.exports = new AccessController();