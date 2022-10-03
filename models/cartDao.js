const appDataSource = require("./dataSource");


const getCartExists = async ( userId, productId ) => {
    const [ result ] = await appDataSource.query(
        `SELECT EXISTS(
            SELECT
                *
            FROM carts
            WHERE user_id = ? AND product_id = ?) AS cart`,
        [ userId, productId ]
    )
    return result
}

const getCartQuantity = async ( userId, productId ) => {
    const [ result ] = await appDataSource.query(
        `SELECT
            quantity
        FROM carts
        WHERE user_id = ? AND product_id = ?`,
        [ userId, productId ]
    )
    return result
}

const getCartToProduct = async ( userId, productId ) => {
    const [ result ] = await appDataSource.query(
        `SELECT IF(
            COUNT(*) = ?, 1, NULL) AS cart
        FROM carts
        WHERE user_id = ? AND product_id IN (?)`,
        [ productId.length, userId, productId ]
    )
    return result
}

const getCart = async ( userId ) => {
    return await appDataSource.query(
        `SELECT
            carts.id,
            carts.product_id as productId,
            pro.name,
            pro.price,
            carts.quantity,
            thum.thumbnail_url as thumbnailUrl,
            carts.check_in as checkIn
        FROM carts INNER JOIN products as pro ON carts.product_id = pro.id
        INNER JOIN thumbnail_images as thum ON thum.product_id = pro.id
        WHERE carts.user_id = ? AND thum.thumbnail_main = 1`,
        [ userId ]
    )
}

const addCart = async ( userId, productId, quantity ) => {
    return await appDataSource.query(
        `INSERT INTO carts(
            user_id,
            product_id,
            quantity
        )VALUES(?, ?, ?)`,
        [ userId, productId, quantity ]
    )
}

const updateCart = async ( userId, productId, quantity ) => {
    return await appDataSource.query(
        `UPDATE carts SET
            quantity = ?
        WHERE user_id = ? AND product_id = ?`,
        [ quantity, userId, productId ]
    )
}

const deleteCart = async ( userId, productId ) => {
    return await appDataSource.query(
        `DELETE FROM carts
        WHERE user_id = ? AND product_id in (?)`,
        [ userId, productId ]
    )
}

const getCartToCheckProduct = async ( userId ) => {
    return await appDataSource.query(
        `SELECT
            products.id,
            carts.quantity,
            products.price
        FROM carts INNER JOIN products ON products.id = carts.product_id
        WHERE user_id = ? AND check_in = 1`,
        [ userId ]
    )
}

const deleteCheckProduct = async ( userId ) => {
    return await appDataSource.query(
        `DELETE FROM carts
        WHERE user_id = ? AND check_in = 1`,
        [ userId ]
    )
}

const updateCheck = async ( userId, productId ) => {
    await appDataSource.query(
        `UPDATE carts SET
            check_in = 0
        WHERE user_id = ?`,
        [ userId ]
    )
    return await appDataSource.query(
        `UPDATE carts SET
            check_in = 1
        WHERE user_id = ? AND product_id IN (?)`,
        [ userId, productId ]
    )
}


module.exports = {
    getCartExists,
    getCartQuantity,
    getCartToProduct,
    getCart,
    addCart,
    updateCart,
    deleteCart,
    getCartToCheckProduct,
    deleteCheckProduct,
    updateCheck
}