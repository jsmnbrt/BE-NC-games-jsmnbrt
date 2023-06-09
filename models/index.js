const db = require("../db/connection");

exports.fetchCategories = () => {
  return db.query(`SELECT * FROM categories;`).then((res) => {
    return res.rows;
  });
};

exports.selectReviewByID = (reviewID) => {
  return db
    .query(
      `
    SELECT * FROM reviews WHERE review_id = $1
    `,
      [reviewID]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return rows[0];
      }
    });
};

exports.fetchReviews = () => {
  return db
    .query(
      `SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer, COUNT(comments.review_id)::INT as comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;`
    )
    .then((res) => {
      return res.rows;
    });
};

exports.fetchComments = (review_id) => {
  return db
    .query(
      `SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.review_id FROM comments WHERE comments.review_id = $1 ORDER BY comments.created_at DESC;`,
      [review_id]
    )
    .then((res) => {
      return res.rows;
    });
};

exports.createComment = (review_id, newComment) => {
  const { username, body } = newComment;
  if (username.length === 0 || body.length === 0 || username === undefined) {
    return Promise.reject({ status: 400, msg: "Invalid input" });
  } else {
    return db
      .query(`SELECT * FROM users WHERE username = $1`, [username])
      .then((userResult) => {
        if (userResult.rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Invalid username" });
        } else {
          return db
            .query(
              `INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING *;`,
              [username, body, review_id]
            )
            .then((res) => {
              return res.rows[0];
            });
        }
      });
  }
};

exports.updateVotes = (review_id, incVotes) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1;`, [review_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "404 - review not found" });
      } else {
        const updatedVotes = rows[0].votes + incVotes;
        return db
          .query(
            "UPDATE reviews SET votes = $2 WHERE review_id = $1 RETURNING *;",
            [review_id, updatedVotes]
          )
          .then(({ rows }) => {
            return rows[0];
          });
      }
    });
};
