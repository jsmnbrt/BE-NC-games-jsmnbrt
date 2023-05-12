const db = require('../db/connection')
const connection = require('../db/connection')
// const { checkReviewIDExists } = require('../utils')


exports.fetchCategories = () => {
    return db.query(`SELECT * FROM categories;`).then((res) => {
        return res.rows
    })
}

// exports.fetchReviews = (review_id) => {
//     return db.query(`SELECT * FROM reviews WHERE review_id = $1;`, 
//     [review_id]).then((res) => {
//         return res.rows[0]
//     })
// }

exports.selectReviewByID = (reviewID) => {
    return db.query(`
    SELECT * FROM reviews WHERE review_id = $1
    `, [reviewID]).then(({rows}) => {
        console.log(rows[0])
        // if (rows.length === 0) {
        //     return Promise.reject({ status: 404, msg: 'Not Found'})
        // }
        return rows [0]
    })
}


// exports.selectReviewByID = (sort_by = 'review_id', review) => {
//     const validSortQuery = ['review_id'];
//     if (!validSortQuery.includes(sort_by)) {
//         return Promise.reject({ status: 400, msg: 'invalid sort query'})
//     }
//     const queryStr = `
//     SELECT reviews.*, review_id FROM reviews
//     JOIN reviews ON reviews.review_id = reviews.review_id
//     WHERE review_id = $1
//     ORDER BY ${sort_by};`;

//     return connection.query(queryStr, [review]).then((result) => {
//         return result.rows;
//     })

// }


// exports.selectReviewByID = (review_id)
// return checkReviewIDExists(review)
// .then(() => {
//     return connection.query(queryStr, queryValues);
// })
// .then((result) => {
//     return result.rows
// })