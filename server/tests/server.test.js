const request = require('supertest');
const {app} = require('../server');
const {Todo} = require('../models/todo');
const {ObjectID} = require('mongodb');

const todos = [
	{
		_id: new ObjectID,
		text: 'Test todo 1'
	},
	{
		_id: new ObjectID,
		text: 'Test todo 2'
	}
]

beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
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
				if (err){
					console.error(err);
					return done(err);
				}
				
				Todo.find({text}).then((todos) => {
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
					expect(todos).toHaveLength(2);
					done();
				}).catch((err) => done(err));
			});
	});
});

describe('GET /todos', () => {
	it('Should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos).toHaveLength(2);
			})
	});
});

describe('POST /todos', () => {
	it('Should create a new todo', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toEqual(todos[0].text);
			})
			.end(done);
	});

	it('Should return 404 if todo not found', (done) => {
		var id = new ObjectID;
		request(app)
			.get(`/todos/${id.toHexString()}`)
			.expect(404)
			.end(done);
	});

	it('Should return 404 for non-object ids', (done) => {
		request(app)
			.get('/todos/0123456789abc')
			.expect(404)
			.end(done);
	});
});