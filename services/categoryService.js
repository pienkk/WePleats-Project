const { categoryDao } = require("../models");


const getNewProductsList = async() => {
    return await categoryDao.getNewProductsList()
}

const getBestCategory = async () => {
    return await categoryDao.getBestCategory()
}

const getProductByCategory = async ( category, id, color ) => {
    return await categoryDao.getProductByCategory( category, id, color );
}


module.exports = {
    getNewProductsList,
    getBestCategory,
    getProductByCategory
}