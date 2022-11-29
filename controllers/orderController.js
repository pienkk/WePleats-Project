const { orderService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl");
const { BaseError } = require("../util/error");


const getOrder = asyncWrap(async (req, res) => {
    const userId = req.user.id

    const order = await orderService.getOrder( userId );
    return res.status(200).json({ order })
})

const getOrderList = asyncWrap(async (req, res) => {
    const userId = req.user.id

    const order = await orderService.getOrderList( userId );
    return res.status(200).json({ order })
})

const createProductToOrder = asyncWrap(async (req, res) => {
    const userId = req.user.id
    const { productId, quantity } = req.body;
    
    if ( !productId || !quantity ) throw new BaseError("KEY_ERROR", 400);

    await orderService.createProductToOrder( userId, productId, quantity )
    return res.status(201).json({ message: "orderOK" })
})

const createOrder = asyncWrap(async (req, res) => {
    const { userId, address, couponId, point, price } = req.body;

    if ( !address || !couponId || !point || !price ) throw new BaseError("KEY_ERROR", 400);

    await orderService.createOrder( userId, address, couponId, point, price );
    return res.status(201).json({ message: "order Success" })
})


module.exports = {
    getOrder,
    getOrderList,
    createProductToOrder,
    createOrder
}
