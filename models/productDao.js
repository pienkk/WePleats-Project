const appDataSource = require("./dataSource");

const getProductImage = async ( productId ) => {
			const image = await appDataSource.query(
					`SELECT
							image_url as image
					FROM product_images
					WHERE product_id = ?`,
					[ productId ]
			)
			return image
}

const getProductDetail = async ( productId ) => {
    try {
        const [ product ] = await appDataSource.query(
            `SELECT
                pro.id,
                pro.name,
                pro.description,
                colors.color,
                main.main_category,
                sub.sub_category,
                main.id as main_category_num,
                sub.id as sub_category_num,
                pro.price,
                sizes.size,
                pro.new
            FROM products as pro
            INNER JOIN categorys as sub ON sub.id = pro.category
            INNER JOIN main_categorys as main ON main.id = sub.main_category
            INNER JOIN sizes ON sizes.id = pro.size
            INNER JOIN colors ON colors.id = pro.color
            WHERE pro.id = ?`,
            [ productId ]
        )
        return product
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    getProductImage,
    getProductDetail
}
