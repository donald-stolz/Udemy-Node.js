const request = require('supertest');
const {app} = require('../server');
const {Todo} = require('../models/todo');

beforeEach((done) => {
	Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
	it('Should create a new todo', (done) => {
		var text = 'Test todot text';

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toEqual(text)
			})
			.end((err, res) => {
				if (err)
				{
					console.error(err);
					return done(err);
				}
				
				Todo.find().then((todos) => {
					expect(todos).toHaveLength(1);
					expect(todos[0].text).toEqual(text);
					done();
				}).catch((err) => done(err));
			});
	});

	it('Should not create Todo with invalid body data', (done) => {
		var text = "	";

		request(app)
			.post('/todos')
			.send({text})
			.expect(400)
			.end((err, res) => {
				if (err)
				{
					console.error(err);
					return done(err);
				}
				
				Todo.find().then((todos) => {
					expect(todos).toHaveLength(0);
					done();
				}).catch((err) => done(err));
			});
	});
});