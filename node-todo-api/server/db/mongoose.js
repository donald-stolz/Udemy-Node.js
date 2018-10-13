var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost270017/TodoApp');

module.exports = { mongoose };