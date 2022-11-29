const { cartService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl");
const { BaseError } = require("../util/error");


const showCart = asyncWrap(async (req, res) => {
    const userId = req.user.id

    const cart = await cartService.showCart( userId );

    return res.status(200).json({ cart })
})

const addCart = asyncWrap(async (req, res) => {
    const userId = req.user.id
    const { productId, quantity } = req.body;
    
    if ( !productId || !quantity ) throw new BaseError("KEY_ERROR", 400);

    await cartService.addCart( userId, productId, quantity );
    return res.status(201).json({ message: "Add cart to product Success"})
})

const checkToProduct = asyncWrap(async (req, res) => {
    const userId = req.user.id
    const { productId } = req.query;

    await cartService.checkToProduct( userId, productId );

    const cart = await cartService.showCart( userId );
    return res.status(200).json({ cart });
})

const editCart = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.query;

    if ( !productId || !quantity ) throw new BaseError("KEY_ERROR", 400);

    await cartService.editCart( userId, productId, quantity );

    const cart = await cartService.showCart( userId );
    return res.status(200).json({ cart });
})

const deleteCart = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.query;

    if ( !productId )  throw new BaseError("KEY_ERROR", 400);

    await cartService.deleteCart( userId, productId );

    const cart = await cartService.showCart( userId );
    return res.status(200).json({ cart });
})


module.exports = {
    showCart,
    addCart,
    checkToProduct,
    editCart,
    deleteCart
}