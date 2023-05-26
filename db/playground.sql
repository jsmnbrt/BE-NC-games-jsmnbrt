\c nc_games_test
  
    SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.review_id FROM comments ORDER BY comments.created_at DESC;