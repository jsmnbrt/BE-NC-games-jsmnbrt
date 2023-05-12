exports.checkReviewExists = (review) => {
    if (review) {
        return connection
        .query('SELECT * FROM reviews WHERE review_id = $1', [review])
        .then((result) => {
            if (result.rows.length === 0 && review) {
                return Promise.reject({ status: 404, msg: 'review ID not found'})
            }
        })
    }
}

