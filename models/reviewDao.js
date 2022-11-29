const appDataSource = require("./dataSource");


const getReview = async ( productId, userId, offset, limit ) => {
    return await appDataSource.query(
        `SELECT
            rv.id,
            users.name,
            rv.comment,
            rv.image_url,
            rv.create_at,
            us.id as control
        FROM reviews AS rv
        INNER JOIN users ON rv.user_id = users.id
        LEFT JOIN users as us ON rv.user_id = us.id
            AND us.id = ?
        WHERE rv.product_id = ?
        ORDER BY id desc LIMIT ?,? `,
        [ userId, productId, offset, limit ]
    )
}

const reviewCount = async ( productId ) => {
    const [ result ] = await appDataSource.query(
        `SELECT
            count(*) AS reviewCount
        FROM reviews
        WHERE product_id = ?`,
        [productId]
    )
    return result
}

const getImageToReview = async ( reviewId ) => {
    const [ image ] = await appDataSource.query(
        `SELECT
            image_url
        FROM reviews
        WHERE id = ?`,
        [ reviewId ]
    )
    return image
}

const getPhotoReview = async ( productId, userId, offset, limit ) => {
    return await appDataSource.query(
        `SELECT
            rv.id,
            users.name,
            rv.comment,
            rv.image_url,
            rv.create_at,
            us.id as control
        FROM reviews as rv INNER JOIN users ON rv.user_id = users.id
        LEFT JOIN users as us ON rv.user_id = us.id AND us.id = ?
        WHERE rv.image_url != "NULL" AND product_id = ?
        ORDER BY id desc LIMIT ?,?`,
        [ userId, productId, offset, limit ]
    )
}

const getReviewExists = async ( userId, productId ) => {
    const [ review ] = await appDataSource.query(
        `SELECT EXISTS(
            SELECT
                *
            FROM reviews
            WHERE user_id = ? AND product_id = ?
        ) AS review`,
        [ userId, productId ]
    )
    return review
}

const checkReview = async ( userId, reviewId ) => {
    const [ review ] = await appDataSource.query(
        `SELECT EXISTS(
            SELECT
                *
            FROM reviews
            WHERE user_id = ? AND id = ?
        ) AS review`,
        [ userId, reviewId ]
    )
    return review;
}


const createReview = async ( userId, productId, comment, image ) => {
    return await appDataSource.query(
        `INSERT INTO reviews(
            user_id,
            product_id,
            comment,
            image_url
        )VALUES( ?, ?, ?, ? )`,
        [ userId, productId, comment, image ]
    )
}

const updateReview = async ( id, comment, image ) => {
    return await appDataSource.query(
        `UPDATE reviews SET
            comment = ?,
            image_url = ?
        WHERE id = ?`,
        [ comment, image, id ]
    )
}

const deleteReview = async ( reviewId ) => {
    return await appDataSource.query(
        `DELETE FROM reviews
        WHERE id = ?`,
        [ reviewId ]
    )
}


module.exports = {
    getReview,
    getImageToReview,
    getPhotoReview,
    checkReview,
    getReviewExists,
    createReview,
    updateReview,
    reviewCount,
    deleteReview
}