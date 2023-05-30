const { fetchCategories } = require("../models/index");
const { selectReviewByID } = require("../models/index");
const { fetchReviews } = require("../models/index");
const { fetchComments } = require("../models/index");
const { createComment } = require("../models/index");
const { updateVotes } = require("../models/index");

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

exports.getComments = (req, res, next) => {
  const { review_id } = req.params;
  fetchComments(review_id)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const { review_id } = req.params;
  const newComment = req.body;
  console.log(newComment, 'CONTROLLER');
  createComment(review_id, newComment)
    .then((comment) => {
      res.status(201).send(comment);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchVotes = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateVotes(review_id, inc_votes)
    .then((review) => {
      res.status(200).send({ review: review });
    })
    .catch((err) => {
      next(err);
    });
};
