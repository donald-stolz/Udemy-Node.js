const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27917/TodoApp');

// var Todo = mongoose.model('Todo', {
// 	text: {
// 		type: String,
// 		required: true,
// 		minlength: 1,
// 		trim: true
// 	},
// 	completed: {
// 		type: Boolean,
// 		default: false
// 	},
// 	completedAt: {
// 		type: Number,
// 		default: null
// 	}
// });

// var newTodo = new Todo({
// 	text: 'Cook dinner',
// });

// newTodo.save().then((doc) => {
// 	console.log('Completed ToDo');
// 	console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
// 	console.error(err);
// });

var User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	age: {
		type: Number,
		required: true,
		min: [18, 'Too young']
	},
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	}
});

var newUser	= new User({
	name: 'Donald',
	age: 22,
	email: 'dstolz@luc.edu'
});

newUser.save().then((doc) => {
	console.log('Added new user: ');
	console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
	console.error(err);
});