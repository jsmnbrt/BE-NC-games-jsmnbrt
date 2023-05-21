const { fetchCategories } = require("../models/index");
const { selectReviewByID } = require("../models/index");
const { fetchReviews } = require("../models/index");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewID = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewByID(review_id)
    .then((review) => {
      res.status(200).send({ review: review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  fetchReviews()
    .then((reviews) => {
      res.status(200).send([{ reviews }]);
    })
    .catch((err) => {
      next(err);
    });
};

