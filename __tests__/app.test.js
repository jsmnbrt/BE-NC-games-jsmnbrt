const testData = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  db.end();
});

describe("404 error handling", () => {
  test("responds with 404 for invalid path", () => {
    return request(app)
      .get("/api/nonsense")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404 - invalid path");
      });
  });
});

describe("GET/api/categories", () => {
  test("responds with an array of category objects with the properties of `slug` and `description`", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const categories = body.categories;
        expect(categories.length).toBe(4);
        categories.forEach((category) => {
          expect(category).toHaveProperty("slug");
          expect(category).toHaveProperty("description");
        });
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("GET - status: 200 - responds with review object", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then((res) => {
        const review = res.body.review;
        expect(review.review_id).toBe(1);
        expect(review.title).toBe("Agricola");
        expect(review.review_body).toBe("Farmyard fun!");
        expect(review.designer).toBe("Uwe Rosenberg");
        expect(review.review_img_url).toBe(
          "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700"
        );
        expect(review.votes).toBe(1);
        expect(review.category).toBe("euro game");
        expect(review.owner).toBe("mallionaire");
        expect(review.created_at).toBe("2021-01-18T10:00:20.514Z");
      });
  });
  test("GET - status: 400 - respond with Bad Request", () => {
    return request(app)
      .get("/api/reviews/asdfghjk")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
  test("GET - status: 404 - respond with not found", () => {
    return request(app)
      .get("/api/reviews/999999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found");
      });
  });
});

describe("GET /api/reviews", () => {
  test("GET - status: 200 - returns an array of review objects", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((res) => {
        const reviews = res.body[0].reviews;
        expect(Array.isArray(reviews)).toBe(true);
        expect(reviews.length).toBeGreaterThan(0);
        reviews.forEach((review) => {
          expect(review).toHaveProperty(`title`);
          expect(review).toHaveProperty(`designer`);
          expect(review).toHaveProperty(`owner`);
          expect(review).toHaveProperty(`review_img_url`);
          expect(review).toHaveProperty(`category`);
          expect(review).toHaveProperty(`created_at`);
          expect(review).toHaveProperty(`votes`);
        });
      });
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  test("GET - status: 200 - responds with an array of comments for a given review_id", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then((res) => {
        const comments = res.body.comments;
        expect(Array.isArray(comments)).toBe(true);
        expect(comments.length).toBe(3);
        comments.forEach((comment) => {
          expect(comment).toHaveProperty(`comment_id`);
          expect(comment).toHaveProperty(`author`);
          expect(comment).toHaveProperty(`body`);
          expect(comment).toHaveProperty(`created_at`);
          expect(comment).toHaveProperty(`votes`);
          expect(comment).toHaveProperty(`review_id`);
        });
      });
  });
});

describe("POST /api/reviews/:review_id/comments", () => {
  test("posts a comment to a particular review_id", () => {
    const newComment = {
      body: "the body!",
      username: "bainesface",
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .expect(201)
      .send(newComment)
      .then(({ body }) => {
        expect(body.body).toBe("the body!");
        expect(body.author).toBe("bainesface");
      });
  });

  test("POST - status: 404 - responds with username not found", () => {
    return request(app)
      .post("/api/reviews/9999999/comments")
      .expect(404)
      .send({ body: "the body!", username: "9999999" })
      .then((res) => {
        expect(res.body.msg).toBe("Invalid username");
      });
  });

  test("POST - status: 400 - responds with 'Invalid input'", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .expect(400)
      .send({ body: "", username: "" })
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  test("updates the votes property of a review", () => {
    const reviewId = 1;
    const newVotes = 5;
    return request(app)
      .patch(`/api/reviews/${reviewId}`)
      .send({ inc_votes: newVotes })
      .expect(200)
      .then((res) => {
        expect(res.body.review.votes).toBe(6);
      });
  });
  test("responds with 404 if review is not found", () => {
    const reviewId = 9999999;
    const newVotes = 5;

    return request(app)
      .patch(`/api/reviews/${reviewId}`)
      .send({ inc_votes: newVotes })
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("404 - review not found");
      });
  });
  test("responds with 400 if invalid input is provided", () => {
    const reviewId = 1;
    const newVotes = "invalid";

    return request(app)
      .patch(`/api/reviews/${reviewId}`)
      .send({ inc_votes: newVotes })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
});
