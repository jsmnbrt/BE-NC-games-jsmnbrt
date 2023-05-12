const db = require('../db/connection')
const connection = require('../db/connection')
// const { checkReviewIDExists } = require('../utils')


exports.fetchCategories = () => {
    return db.query(`SELECT * FROM categories;`).then((res) => {
        return res.rows
    })
}


exports.selectReviewByID = (reviewID) => {
    return db.query(`
    SELECT * FROM reviews WHERE review_id = $1
    `, [reviewID]).then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found'})
        } else{
        return rows [0]
}})
}





