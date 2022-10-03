const { BaseError } = require("./error")

const validatePassword = (password) => {
    const passwordCondition =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (!passwordCondition.test(password)) throw new BaseError("INVALID_PASSWORD", 400);
}

const validateEmail = (email) => {
    const emailCondition =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    
    if (!emailCondition.test(email)) throw new BaseError("INVALID_EMAIL", 400);
}

const validatePhone = (number) => {
    const phoneCondition =/^\d{3}-\d{3,4}-\d{4}$/;
    
    if (!phoneCondition.test(number)) throw new BaseError("INVALID_PHONE_NUMBER", 400);
}

module.exports = {
    validateEmail,
    validatePassword,
    validatePhone
}