const { orderDao, cartDao, userDao, productDao } = require("../models");
const { BaseError } = require("../util/error");


const getOrder = async ( userId ) => {
    const [ cart ] = await cartDao.getCartToCheckProduct( userId );
    if ( !cart ) throw new BaseError("Shopping cart not in selected products", 403);

    const user = await userDao.getOrderUserInfo( userId );
    const products = await orderDao.getOrderProduct( userId );
    const coupons = await orderDao.getCouponToUser( userId );

    for ( const el of products ) {
        el.price = el.price * el.quantity
    }

    user.product = products;
    user.coupon = coupons;

    return user
}

const getOrderList = async ( userId ) => {
    return await orderDao.getOrderList( userId );
}

const createOrder = async ( userId, address, couponId, point, price ) => {
    const products = await cartDao.getCartToCheckProduct( userId );
    if ( products.length == 0 ) throw new BaseError("Shopping cart not in selected products", 403);

    const user = await userDao.getOrderUserInfo( userId );
    if ( user.point < point ) throw new BaseError("There are few points", 403);

    const savePoint = price * 0.05 * user.grade;
    
    if ( couponId ) {
        const useCoupon = await userDao.getCoupon( userId, couponId );
        if ( !useCoupon ) throw new BaseError("Coupon does not exist", 403);
    }

    const { insertId } = await orderDao.createOrderList( price, address );
    await orderDao.createOrder( userId, products, insertId );
    await cartDao.deleteCheckProduct( userId );
    await userDao.updateCoupon( userId, couponId );
    return await userDao.updatePoint( userId, user.point - point + savePoint );
}

const createProductToOrder = async ( userId, productId, quantity ) => {
    const product = await productDao.getProductById( productId );
    if ( !product ) throw new BaseError("INVALID_PRODUCT", 406);
  
    const { cart } = await cartDao.getCartExists( userId, productId );
    if ( +cart ) {
        await cartDao.updateCart( userId, productId, quantity );
    }

    await cartDao.addCart( userId, productId, quantity );
    return await cartDao.updateCheck( userId, productId );
}


module.exports = {
    getOrder,
    createOrder,
    getOrderList,
    createProductToOrder
}