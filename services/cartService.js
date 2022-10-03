const { cartDao, productDao } = require("../models");
const { BaseError } = require("../util/error");


const showCart = async ( userId ) => {
    const carts = await cartDao.getCart( userId );

    for (const object of carts) {
        object.price = ( object.price * object.quantity );
        object.deliveryfee = 0;
        if( object.price < 50000 ) object.deliveryfee = 3000;
    }

    return carts
}

const addCart = async ( userId, productId, quantity ) => {
    const product = await productDao.getProductById( productId );
    if ( !product ) throw new BaseError("INVALID_PRODUCT", 406);

    const { cart } = await cartDao.getCartExists( userId, productId );
    if ( +cart ) {
        const num = await cartDao.getCartQuantity( userId, productId );
        quantity += num.quantity;
        return await cartDao.updateCart( userId, productId, quantity );
    }

    return await cartDao.addCart( userId, productId, quantity );
}

const checkToProduct = async ( userId, productId ) => {
    return await cartDao.updateCheck( userId, productId );
}

const editCart = async ( userId, productId, quantity ) => {
    const { cart } = await cartDao.getCartExists( userId, productId );
    if( !+cart ) throw new BaseError("This product not in cart", 406)

    return await cartDao.updateCart( userId, productId, quantity )
}

const deleteCart = async ( userId, productId ) => {
    if ( !Array.isArray( productId ) ) productId = [ productId ];

    const { cart } = await cartDao.getCartToProduct( userId, productId );
    if ( !+cart ) throw new BaseError("Products is not in cart", 406);
    
    return await cartDao.deleteCart( userId, productId );
}


module.exports = {
    showCart,
    addCart,
    checkToProduct,
    editCart,
    deleteCart
}