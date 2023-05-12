const { fetchCategories } = require('../models/index')
const { selectReviewByID } = require('../models/index')
const { checkReviewIDExists } = require('../models/index')

exports.getCategories = (req, res, next) => {
    fetchCategories().then((categories) => {
        res.status(200).send({ categories })
    }).catch((err) => {
        next(err)
    } )
}

exports.getReviewID = (req, res, next) => {
    const { review_id } = req.params 
    selectReviewByID(review_id).then((review) => {
        res.status(200).send({ review: review })
    }).catch((err) => {
        next(err)
    })
}

// exports.invalidID = (req, res, next) => {
//     checkReviewIDExists().then((nullReview) => {
//         res.status(404).send({ nullReview, msg: 'review ID not found'})
//     })
// }

