const appDataSource = require('./dataSource')


const getProductByCategory = async (category, id, color) => {
    return await appDataSource.query(
        `SELECT
            pro.id,
            pro.name,
            pro.price,
            colors.color,
            main.main_category,
            cate.sub_category,
            cate.id as category,
            pro.new,
            JSON_ARRAYAGG(thumb.thumbnail_url) AS thumbnail_url
        FROM products AS pro
        INNER JOIN colors ON pro.color = colors.id
        INNER JOIN categorys AS cate ON pro.category = cate.id
        INNER JOIN main_categorys AS main ON main.id = cate.main_category
        INNER JOIN thumbnail_images AS thumb ON thumb.product_id = pro.id
        WHERE IF(? = 'main', main.id = ?,
        IF(? = 'sub', cate.id = ?, null)
        )
        AND IF(? = ?, colors.id = ?, "")
        GROUP BY pro.id`, 
        [category, id, category, id, color, color, color]
    )
}

const getNewProductsList = async () => {
    return await appDataSource.query(
        `SELECT
            pro.id,
            pro.name,
            pro.price,
            colors.color,
            main.main_category,
            cate.sub_category,
            cate.id as category,
            pro.new,
            JSON_ARRAYAGG(thumb.thumbnail_url) AS thumbnail_url
        FROM products AS pro
        INNER JOIN colors ON pro.color = colors.id
        INNER JOIN categorys AS cate ON pro.category = cate.id
        INNER JOIN main_categorys AS main ON main.id = cate.main_category
        INNER JOIN thumbnail_images AS thumb ON thumb.product_id = pro.id
        WHERE pro.new = 1
        GROUP BY pro.id`,
    )
}

const getBestCategory = async () => {
    return await appDataSource.query(
        `SELECT
            pro.id,
            pro.name,
            pro.price,
            colors.color,
            main.main_category,
            cate.sub_category,
            cate.id as category,
            pro.new,
        JSON_ARRAYAGG(thumb.thumbnail_url) AS thumbnail_url
        FROM (SELECT
                product_id
                FROM orders GROUP BY product_id
                ORDER BY sum(quantity) DESC limit 12) AS sum
        INNER JOIN products AS pro ON pro.id = sum.product_id
        INNER JOIN colors ON pro.color = colors.id
        INNER JOIN categorys AS cate ON pro.category = cate.id
        INNER JOIN main_categorys AS main ON main.id = cate.main_category
        INNER JOIN thumbnail_images AS thumb ON thumb.product_id = pro.id
        GROUP BY pro.id`
    )
}


module.exports = {
    getProductByCategory,
    getBestCategory,
    getNewProductsList
}