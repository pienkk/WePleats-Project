const { userService } = require('../services');
const { asyncWrap } = require("../middleware/errorControl")


const signIn = asyncWrap(async (req, res) => {
    const { email, password } = req.body

    const accessToken = await userService.signIn(email, password)
    
    res.status(200).json({ accessToken })
})
const signUp =asyncWrap( async (req, res) => {
    try {
        const { name, email, password, birthday, phone_number, address, gender, profile_image} = req.body;

        if ( !name || !email || !password || !birthday || !phone_number || !gender ) {
            const error = new Error('KEY_ERROR')
            error.statusCode = 400
            throw error
        }

        await userService.signUp(name, email, password, birthday,phone_number, address, gender, profile_image)
        return res.status(201).json({ message: 'signup success' })
    } catch(err) {
        console.log(err)
        return res.status(statusCode || 500).json({ message: err.message })
    }
})

const getNav = asyncWrap(async (req, res) => {
    const { userId } = req.body;
    const nav = await userService.getNav( userId )
    return res.status(200).json({nav})
})

module.exports = {
    signIn,
    signUp,
    getNav
}
