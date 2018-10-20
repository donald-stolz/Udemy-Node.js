const request = require('supertest');
const {app} = require('../server');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');
const {ObjectID} = require('mongodb');

const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

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

describe('DELETE /todos/:id', () => {
	it('Should remove a todo', (done) => {
		var hexID = todos[1]._id.toHexString();

		request(app)
			.delete(`/todos/${hexID}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toEqual(hexID);
			}).end((err, res) => {
				if (err) {
					return done(err);
				}
				Todo.findById(hexID).then((todo) => {
					expect(todo).toBeNull();
					done();
				}).catch((err) => done(err))
			})
	});

	it('Should return 404 if todo not found', (done) => {
		var id = new ObjectID;
		request(app)
			.delete(`/todos/${id.toHexString()}`)
			.expect(404)
			.end(done);
	});

	it('Should return 404 if object id is invalid', (done) => {
		request(app)
			.delete('/todos/0123456789abc')
			.expect(404)
			.end(done);
	});
});

describe('PATCH /todos/:id', (done) => {
	it('Should update the todo', (done) => {
		const id = todos[0]._id.toHexString();
		var text = 'This is brand new text!';

		request(app)
			.patch(`todos/${id}`)
			.send({
				completed: true,
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toEqual(text);
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toBeTruthy();
			})
			.end(done)
	});

	it('Should clear completedAt when todo is not completed', (done) => {
		const id = todos[1]._id.toHexString();
		var text = 'This is brand new text!';

		request(app)
			.patch(`todos/${id}`)
			.send({
				completed: false,
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toEqual(text);
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toBeFalsy();
			})
			.end(done)
	});
});

describe('GET /users/me', () => {
	it('Should return user if authenticated', (done) => {
		request(app)
			.get('/users/me')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect((res) => {
				expect(res.body._id).toEqual(users[0]._id.toHexString());
				expect(res.body.email).toEqual(users[0].email);
			})
			.end(done);
	});

	it('Should return 401, not authenticated', (done) => {
		request(app)
			.get('/users/me')
			.expect(401)
			.expect((res) => {
				expect(res.body).toEqual({});
			})
			.end(done);
	});
});

describe('POST /users/me', () => {
	it('Should create a user', (done) => {
		var email = 'email@test.com';
		var password = 'pass123';

		request(app)
			.post('/users')
			.send({email, password})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toBeTruthy();
				expect(res.bond._id).toBeTruthy();
				expect(res.body.email).toEqual(email);
			})
			.end((err) => {
				if (err) {
					return done(err);
				}
				User.findOne({email}).then((user) => {
					expect(user).toBeTruthy();
					expect(user.password).not.toBe(password);
					done();
				})
			});
	});

	it('Should return validation errors, invalid request', (done) => {
		var email = 'new@email.net';
		var password = '123';

		request(app)
			.post('/users')
			.send({ email, password })
			.expect(400)
			.end(done);
	});

	it('Should not creat user, existing email', (done) => {
		var email = 'dstolz@email.com';
		var password = '123password';

		request(app)
			.post('/users')
			.send({ email, password })
			.expect(400)
			.end(done);
	});
});