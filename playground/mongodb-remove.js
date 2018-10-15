const {ObjectID} = require('mongodb');
const {mongoos} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

// Todo.findOneAndRemove();
Todo.findOneAndRemove({ _id: '5bc3f1bdddf802001664390e'}).then((todo) => {
	console.log(todo);
});

Todo.findByIdAndRemove('5bc3f1bdddf802001664390e').then((todo) => {
	console.log(todo);
});
