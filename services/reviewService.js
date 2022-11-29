const { reviewDao, productDao, orderDao } = require("../models");
const { BaseError } = require("../util/error");


const getReview = async ( productId, userId, offset, limit  ) => {
    const searchProduct = await productDao.getProductById( productId );

    if ( !searchProduct ) throw new BaseError("INVALID_PRODUCT", 406);

    return await reviewDao.getReview( productId, userId, +offset || 0, +limit || 5 );
}

const getPhotoReview = async ( productId, userId, offset, limit ) => {
    const searchProduct = await productDao.getProductById( productId );

    if ( !searchProduct ) throw new BaseError("INVALID_PRODUCT", 406);

    return await reviewDao.getPhotoReview( productId, userId, +offset, +limit );
}

const postReview = async ( userId, productId, comment, image ) => {
    const searchProduct = await productDao.getProductById( productId );
    if ( !searchProduct ) throw new BaseError("INVALID_PRODUCT", 406);

    const searchOrder = await orderDao.getOrder( userId, productId );
    if ( !searchOrder ) throw new BaseError("Purchased products can be reviewd", 403);

    const { review } = await reviewDao.getReviewExists( userId, productId );
    if ( +review ) throw new BaseError("Only one review can be created", 403);

    if ( image ) image = image.location;

    return await reviewDao.createReview( userId, productId, comment, image );
}

const editReview = async ( userId, reviewId, comment, image ) => {
    const { review } = await reviewDao.checkReview( userId, reviewId );
    if ( review == 0 ) throw new BaseError("No reviews written", 403);

    if ( image ) image = image.location;
    const { image_url } = await reviewDao.getImageToReview( reviewId );

    return await reviewDao.updateReview( reviewId, comment, image ? image : image_url );
}

const deleteReview = async ( userId, reviewId ) => {
    const { review } = await reviewDao.checkReview( userId, reviewId );
    if ( review == 0 ) throw new BaseError("No reviews written", 403);
    
    return await reviewDao.deleteReview( reviewId );
}


module.exports = {
    getReview,
    getPhotoReview,
    postReview,
    editReview,
    deleteReview
}