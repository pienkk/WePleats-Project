const { reviewService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl");
const { BaseError } = require("../util/error");

const getReview = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;
    const { offset, limit } = req.query;

    if ( !productId || !offset || !limit ) throw new BaseError("KEY_ERROR", 400);

    const review = await reviewService.getReview( productId, userId, offset, limit );
    return res.status(200).json({ review });
})

const getPhotoReview = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;
    const { offset, limit } = req.query;

    if ( !productId || !offset || !limit ) throw new BaseError("KEY_ERROR", 400);

    const review = await reviewService.getPhotoReview( productId, userId, offset, limit );
    return res.status(200).json({ review });
})

const postReview = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const { productId, comment } = req.body;
    const image = req.file;

    if ( !productId || !comment ) throw new BaseError("KEY_ERROR", 400);
    
    await reviewService.postReview( userId, productId, comment, image );

    const review = await reviewService.getReview( productId, userId );
    return res.status(200).json({ message : "Create Review Success", review });
})

const editReview =  asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const { reviewId, comment, productId } = req.body;
    const image = req.file;
    
    if ( !reviewId || !comment ) throw new BaseError("KEY_ERROR", 400);

    await reviewService.editReview( userId, reviewId, comment, image );

    const review = await reviewService.getReview( productId, userId );
    return res.status(200).json({ message: "Update Review Success", review })
})

const deleteReview = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const { reviewId, productId } = req.query;

    if ( !reviewId ) throw new BaseError("KEY_ERROR", 400);

    await reviewService.deleteReview( userId, reviewId );

    const review = await reviewService.getReview( productId, userId );
    return res.status(200).json({ review });
})


module.exports = {
    getReview,
    getPhotoReview,
    postReview,
    editReview,
    deleteReview
}