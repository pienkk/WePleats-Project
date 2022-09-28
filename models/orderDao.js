const appDataSource = require("./dataSource");

const getOrderProduct = async ( userId ) => {
    try {
        const result = await appDataSource.query(
            `SELECT
                products.id,
                products.name,
                carts.quantity,
                products.price,
                thumb.thumbnail_url
            FROM products INNER JOIN carts ON products.id = carts.product_id
            INNER JOIN thumbnail_images AS thumb ON products.id = thumb.product_id
            WHERE carts.check_in = 1 AND thumb.thumbnail_main = 1 AND carts.user_id = ?`,
            [ userId ]
        )
        return result
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const getCouponToUser = async ( userId ) => {
    try {
        const result = await appDataSource.query(
            `SELECT
                coupons.id,
                coupons.coupon_money,
                user_coupons.quantity
            FROM user_coupons INNER JOIN coupons ON user_coupons.coupon_id = coupons.id
            WHERE user_coupons.user_id = ? AND user_coupons.quantity != 0`,
            [ userId ]
        )
        return result
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const createOrderList = async ( price, address ) => {
    try {
        return await appDataSource.query(
            `INSERT INTO order_list(
                order_status,
                price,
                address
            )VALUES( 1, ?, ? )`,
            [ price, address ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const createOrder = async ( userId, products, insertId ) => {
    let bulkData = "";

    products.map(el => {
        bulkData += `(${userId},${el.id},${el.quantity},${el.price},${insertId}),`
    })

    bulkData = bulkData.slice(0,-1);
    try {
        return await appDataSource.query(
            `INSERT INTO orders(
                user_id,
                product_id,
                quantity,
                price,
                order_list
            )VALUES` + bulkData
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const getOrderList = async ( userId ) => {
    try {
        return await appDataSource.query(
            `SELECT
                order_list.id AS listId,
                order_list.order_status AS listOrder,
                order_list.price AS listPrice,
                order_list.address,
                orders.id AS orderId,
                products.id AS productId,
                orders.price,
                orders.quantity,
                products.name,
                thumb.thumbnail_url
            FROM order_list INNER JOIN orders ON order_list.id = orders.order_list
            INNER JOIN products ON orders.product_id = products.id
            INNER JOIN thumbnail_images as thumb ON products.id = thumb.product_id
            WHERE orders.user_id = ? AND thumb.thumbnail_main = 1`,
            [ userId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}


module.exports = {
    getOrderProduct,
    getCouponToUser,
    createOrderList,
    getOrderList,
    createOrder
}