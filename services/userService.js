const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userDao, cartDao } = require('../models');
const userValidation = require("../util/userValidation");
const { BaseError } = require("../util/error")


const signIn = async ( email, password ) => {
    userValidation.validateEmail( email );
    userValidation.validatePassword( password )

    const user = await userDao.getUserByEmail( email );
    const match = await bcrypt.compare( password, user.password );

    if (!match) throw new BaseError("Password is INVALID", 406);

    return jwt.sign({ user_id: user.id }, process.env.TOKKENSECRET);
}

const signUp = async ( name, email, password, birthday, phone_number, address, gender, profile_image ) => {
    userValidation.validateEmail( email );
    userValidation.validatePassword( password );

    const hashPassword = await bcrypt.hash( password, 10 );

    return await userDao.createUser( name, email, hashPassword, birthday, phone_number, address, gender, profile_image );
}

const getNav = async ( userId ) => {
    const user = await userDao.getUserById( userId );
    const carts = await cartDao.getCartCount( userId );
    user.carts = carts
    const nav = {name:user.name, count:carts.count}
    return nav
}


module.exports = {
    signIn,
    signUp,
    getNav
}

