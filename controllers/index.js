const { fetchCategories } = require('../models/index')

exports.getCategories = (req, res, next) => {
    fetchCategories().then((categories) => {
        res.status(200).send({ categories })
    }).catch((err) => {
        next(err)
    } )
}