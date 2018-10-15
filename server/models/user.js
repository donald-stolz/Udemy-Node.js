const mongoose = require('mongoose');

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

module.exports = { User };

// var newUser = new User({
// 	name: 'Donald',
// 	age: 22,
// 	email: 'dstolz@luc.edu'
// });

// newUser.save().then((doc) => {
// 	console.log('Added new user: ');
// 	console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
// 	console.error(err);
// });