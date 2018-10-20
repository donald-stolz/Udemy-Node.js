const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');

const todos = [
	{
		_id: new ObjectID,
		text: 'Test todo 1'
	},
	{
		_id: new ObjectID,
		text: 'Test todo 2',
		completed: true,
		completedAt: 333
	}
];

const user1_id = new ObjectID();
const user2_id = new ObjectID();
const users = [
	{
		name: "Don",
		age: 22,
		_id: user1_id,
		email: "dstolz@email.com",
		password: "abc123",
		tokens: [{
			access: 'auth',
			token: jwt.sign({_id: user1_id, access: 'auth'}, 'abc123').toString()
		}]
	},
	{
		_id: user2_id,
		name: "Dan",
		age: 17,
		email: "dlz@email.com",
		password: "password2"
	}
]

const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
};

const populateUsers = (done) => {
	User.remove({}).then(() => {
		var user1 = new User(users[0].save());
		var user2 = new User(users[1].save());

		return Promise.all([userOne, userTwo]);
	}).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};