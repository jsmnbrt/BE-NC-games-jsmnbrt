const express = require("express");
const cors = require("cors");
const app = express();
const { getCategories } = require("./controllers/index");
const { getReviewID } = require("./controllers/index");
const { getReviews } = require("./controllers/index");
const { getComments } = require("./controllers/index");
const { postComment } = require("./controllers/index");
const { patchVotes } = require("./controllers/index");

app.use(cors());
app.use(express.json());
app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewID);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id/comments", getComments);
app.post("/api/reviews/:review_id/comments", postComment);
app.patch("/api/reviews/:review_id", patchVotes);

app.use("*", (req, res) => {
  res.status(404).send({ msg: "404 - invalid path" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "server error" });
});

module.exports = app;
