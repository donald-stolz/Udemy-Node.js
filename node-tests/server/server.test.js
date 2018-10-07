const request = require('supertest');
const app = require('./server').app;

describe('Server', () => {
	describe('GET /', () => {
		it('should return Page not found response', (done) => {
			request(app)
				.get('/')
				.expect(404)
				.expect((res) => {
					expect(res.body).toMatchObject({
						error: 'Page not found',
						name: expect.any(String)
					});
				})
				.end(done);
		});
	});

	describe('GET /users', () => {
		it('Should return array of user objects', (done) => {
			request(app)
				.get('/users')
				.expect(200)
				.expect((res) => {
					expect(res.body).toEqual(
						expect.arrayContaining([{
							name: 'User 0',
							age: expect.any(Number),
							location: expect.any(String
						)}]));
					expect(res.body).toHaveLength(5);
				})
				.end(done);
		});
	});
});
