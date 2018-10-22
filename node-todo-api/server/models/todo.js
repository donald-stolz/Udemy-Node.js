const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = { Todo };

// var newTodo = new Todo({
// 	text: 'Cook dinner',
// });

// newTodo.save().then((doc) => {
// 	console.log('Completed ToDo');
// 	console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
// 	console.error(err);
// });
