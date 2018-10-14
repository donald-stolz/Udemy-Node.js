const {ObjectID} = require('mongodb');
const {mongoos} = require('../server/db/mongoose');
// const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// var id = 'uo9u0a39e2u498uko8';

if (!ObjectID.isValid(id)) {
	console.log('ID not valid');
}

// Todo.find({ _id: id }).then((todos) => {
// 	console.log('Todos', todos);
// });

// Todo.findOne({ _id: id }).then((todo) => {
// 	if (!todo) {
// 		return console.log('Todo not found');
// 	}
// 	console.log('Todo', todo);	
// });

// Todo.findById(id).then((todo) => {
// 	if (!todo) {
// 		return console.log('ID not found');
// 	}
// 	console.log('Todo by ID', todo);		
// });

User.findOne({ _id: id }).then((user) => {
	if (!user) {
		return console.log('User not found');
	}
	console.log('User', user);
}, (err) => {
	console.error(err);

});

User.findById(id).then((user) => {
	if (!user) {
		return console.log('User not found');
	}
	console.log('User by ID', user);
}).catch((err) => console.error(err));