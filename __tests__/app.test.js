const testData = require('../db/data/test-data');
const request = require('supertest')
const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')

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