const { categoryService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl");
const { BaseError } = require("../util/error");


const getNewProductsList = asyncWrap(async (req, res) => {
    const getNewProducts = await categoryService.getNewProductsList();

    res.status(201).json({ getNewProducts });
})
    
const getProductByCategory = asyncWrap(async (req, res) => {
    const { category, id, color } = req.query;
    if ( !category || !id ) throw new BaseError("KEY_ERROR", 400);

    const getProducts = await categoryService.getProductByCategory(category, id, color)
	res.status(201).json({ getProducts });
})

const getBestCategory = asyncWrap(async (req, res) => {
    const category = await categoryService.getBestCategory();

    return res.status(200).json({ category });
})


module.exports = {
    getBestCategory,
    getNewProductsList,
    getProductByCategory
}