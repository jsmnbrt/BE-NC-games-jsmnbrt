const testData = require('../db/data/test-data');
const request = require('supertest')
const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed');



beforeEach(() => {
    return seed(testData)
})

afterAll(() => {
    db.end()
})

describe("GET/api/categories", () => {
    test("responds with an array of category objects with the properties of `slug` and `description`", () => {
        return request(app).get('/api/categories').expect(200).then(({ body }) => {
            const categories = body.categories
            expect(categories.length).toBe(4)
            categories.forEach((category) => {
                expect(category).toHaveProperty('slug')
                expect(category).toHaveProperty('description')
            })
        })

    })
})

describe("404 error handling", () => {
    test('responds with 404 for invalid path', () => {
        return request(app).get('/api/nonsense').expect(404).then(({ body}) => {
            expect(body.msg).toBe('404 - invalid path')
        })
    })
})

describe("GET/api/reviews/:review_id", () => {
    test("GET - status: 200 - responds with review object", () => {
        return request(app).get('/api/reviews/1').expect(200).then((res) => {
            const review = res.body.review
            expect(review.review_id).toBe(1);
            expect(review.title).toBe('Agricola')
            expect(review.review_body).toBe('Farmyard fun!')
            expect(review.designer).toBe('Uwe Rosenberg')
            expect(review.review_img_url).toBe('https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700')
            expect(review.votes).toBe(1)
            expect(review.category).toBe('euro game')
            expect(review.owner).toBe('mallionaire')
            expect(review.created_at).toBe('2021-01-18T10:00:20.514Z')
        })
    })
    test("GET - status: 400 - respond with Bad Request", () => {
        return request(app)
        .get('/api/reviews/asdfghjk').expect(400)
        .then((res) => {
            expect(res.body.msg).toBe('Invalid input')
        });
    });
    test("GET - status: 404 - respond with not found", () => {
        return request(app)
        .get('/api/reviews/999999').expect(404)
        .then((res) => {
            expect(res.body.msg).toBe('Not Found')
        });
    });
});


