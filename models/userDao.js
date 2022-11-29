const appDataSource = require('./dataSource')

const createUser = async (name, email, password, birthday, phone_number, address, gender, profile_image) => {
    return await appDataSource.query(`
    INSERT INTO users (
        name,
        email,
        password,
        birthday,
        phone_number,
        address,
        gender,
        profile_image
    ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )`,
    [ name, email, password, birthday, phone_number, address, gender, profile_image ]
    )
}

const getUserByEmail = async (email) => {
    const [ user ] = await appDataSource.query(`
    SELECT
        id,
        name,
        email,
        password
    FROM users
    WHERE email=?`,
    [email]
    )
    return user
}

const getUserById = async (id) => {
    const [ result ] = await appDataSource.query(`
    SELECT
        *
    FROM users
    WHERE id=?`, 
    [id]
    )
    return result
}

const getOrderUserInfo = async ( userId ) => {
    const [ result ] = await appDataSource.query(
        `SELECT
            id,
            name,
            email,
            phone_number,
            address,
            grade,
            point
        FROM users
        WHERE id = ?`,
        [ userId ]
    )
    return result
}    

const getCoupon = async ( userId, coupon ) => {
    const [ result ] = await appDataSource.query(
        `SELECT
            *
        FROM user_coupons
        WHERE user_id = ? AND coupon_id = ? AND quantity != 0`,
        [ userId, coupon ]
    )
    return result
}

const updateCoupon = async ( userId, couponId ) => {
    return await appDataSource.query(
        `UPDATE user_coupons SET
            quantity = quantity - 1
        WHERE user_id = ? AND coupon_id = ?`,
        [ userId, couponId ]
    )
}

const updatePoint = async ( userId, point ) => {
    return await appDataSource.query(
        `UPDATE users SET
            point = ?
        WHERE id = ?`,
        [ point, userId ]
    )   
}

const setCoupon = async ( userId ) => {
    return await appDataSource.query(
        `INSERT INTO user_coupons(
            user_id,
            coupon_id,
            quantity
        )VALUES(?, 3, 2)`,
        [ userId ]
    )
}


module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    getOrderUserInfo,
    getCoupon,
    updateCoupon,
    updatePoint,
    setCoupon
}