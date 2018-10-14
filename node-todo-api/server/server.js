const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
		console.log('Added doc to db');
	}, (err) => {
		res.status(400).send(err);
		console.error(err);
	});
});

app.listen(3000, () => {
	console.log('Started on port 3000');
});

module.exports = {app};