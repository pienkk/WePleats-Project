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


const getUserId = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if ( !token ) {
            req.user = 0;
            return next();
        }

        const { user_id } = jwt.verify(token, process.env.TOKKENSECRET);

        const user = await userDao.getUserById( user_id )
        req.user = user;

        return next();
    } catch(err) {
        req.user = 0
        next();
    }
}


module.exports = {
    accessToken,
    getUserId
}
