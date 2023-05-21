\c nc_games_test
  
    SELECT * FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    ORDER BY reviews.created_at DESC;