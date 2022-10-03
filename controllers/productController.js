const { productService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl");
const { BaseError } = require("../util/error");


const getProduct = asyncWrap(async (req, res) => {
    const { productId } = req.params;

    if ( !productId ) throw new BaseError("KEY_ERROR", 400);

    const product = await productService.getProduct( productId );
    return res.status(200).json({ product });
})


module.exports = {
    getProduct
}