const { productDao } = require("../models");
const { BaseError } = require("../util/error");


const getProduct = async ( productId ) => {
    const product = await productDao.getProductDetail( productId );
    if ( !product ) throw new BaseError("INVALID_PRODUCT", 406);

    const images = await productDao.getProductImage( productId );
    product.image_url = images;

    return product
}


module.exports = {
    getProduct
}