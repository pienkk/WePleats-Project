const { productDao } = require("../models");
const { BaseError } = require("../util/error");


const getProduct = async ( productId ) => {
    const product = await productDao.getProductDetail( productId );
    if ( !product ) throw new BaseError("INVALID_PRODUCT", 406);

    const { reviewCount } = await reviewDao.reviewCount( productId );
    const images = await productDao.getProductImage( productId );
    
    product.image_url = images
    product.reviewCount = +reviewCount

    return product
}


module.exports = {
    getProduct
}