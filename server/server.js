require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const mongoose = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');
const {authenticate} = require('./middleware/authenticate');
const _ = require('lodash');
const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json());

// POST /todos
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

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send(todos);
	}, (err) => {
		console.error(err);
		res.status(400).send({todos});
	});
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((err) => {
		return res.status(400).send();
	});
});

app.delete('/todos/:id', (req, res) => {
	const id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((err) => {
		return res.status(400).send();
	});
});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
	if (_.isBoolean(body.completed)) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}
	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		res.send({todo});
	}).catch((err) => res.status(400).send())
});

//POST /users
app.post('/users', (req, res) => {
	var user = new User(_.pick(req.body, ['name', 'age', 'email', 'password']));

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user)
	}).catch((err) => {
		res.status(400).send(err);
		console.error(err);
	});
});

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};