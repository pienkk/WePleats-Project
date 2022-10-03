const jwt = require("jsonwebtoken");
const { userDao } = require("../models");

const accessToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const access = jwt.verify(token, process.env.TOKKENSECRET);

        const user = await userDao.getUserById( access.user_id )

        if ( !user ) {
            return res.status(403).json({ message: "INVALID_USER"})
        }

        req.user = user;

        return next()
    } catch (err) {
        return res.status(400).json({ message: "INVALID_TOKEN"});
    }
};

module.exports = accessToken