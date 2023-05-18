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

//maybe this isnt bringing back an array?
// COUNT(comments.comment_id) AS comment_count
// don't forget to remove review body for each review
