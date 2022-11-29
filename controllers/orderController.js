const { orderService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl")

const getOrder = asyncWrap(async (req, res) => {
    const { userId } = req.body;

    const result = await orderService.getOrder( userId );
    console.log(result)
    return res.status(200).json({ order: result })
})

const getOrderList = asyncWrap(async (req, res) => {
    const { userId } = req.body;

    const result = await orderService.getOrderList( userId );
    return res.status(200).json({ order: result })
})

const createProductToOrder = asyncWrap(async (req, res) => {
    const { userId, productId, quantity } = req.body;
    
    if ( !productId || !quantity ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }

    await orderService.createProductToOrder( userId, productId, quantity )
    return res.status(201).json({ message: "orderOK"})
})

const createOrder = asyncWrap(async (req, res) => {
    const { userId, address, couponId, point, price } = req.body;
	console.log(req.body)
    if ( !address || !price ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }

    await orderService.createOrder( userId, address, couponId, point, price );

    return res.status(201).json({ message: "order Success"})
})

module.exports = {
    getOrder,
    getOrderList,
    createOrder,
    createProductToOrder
}
