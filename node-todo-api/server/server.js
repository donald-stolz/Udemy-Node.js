require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const mongoose = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');
const { authenticate } = require('./middleware/authenticate');
const _ = require('lodash');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST /todos
app.post('/todos', authenticate, (req, res) => {
	try {
		var todo = new Todo({
			text: req.body.text,
			_creator: req.user._id
		});
		const doc = await todo.save()
		res.send(doc)
	} catch (error) {
		res.status(400).send(error);
		
	}
});

app.get('/todos', authenticate, (req, res) => {
	try {
		const todos = await Todo.find({
			_creator: req.user._id
		})
		res.send(todos)
	} catch (error) {
		res.status(400).send({ todos });	
	}
});

app.get('/todos/:id', authenticate, async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectID.isValid(id)) {
            throw new Error();
        }
        const todo = await Todo.findOne({
            _id: id,
            _creator: req.user._id
        });
        if (!todo) {
			return res.status(404).send();
        }
        res.send({ todo });
    } catch (error) {
		return res.status(400).send();
    }
});

app.delete('/todos/:id', authenticate, (req, res) => {
	try {
		const id = req.params.id;
		const todo = await Todo.findOneAndDelete({
			_id: id,
			_creator: req.user._id
		});
		if (!todo) {
			return res.status(404).send();
		}
		res.send({ todo });
	} catch (error) {
		return res.status(400).send();
	}
});

app.patch('/todos/:id', authenticate, (req, res) => {
	try {
		const id = req.params.id;
		const body = _.pick(req.body, ['text', 'completed']);
		if (!ObjectID.isValid(id)) {
			return res.status(404).send();
		}
		if (_.isBoolean(body.completed)) {
			body.completedAt = new Date().getTime();
		} else {
			body.completed = false;
			body.completedAt = null;
		}
		const todo = Todo.findOneAndUpdate(
			{
				_id: id,
				_creator: req.user.id
			},
			{ $set: body },
			{ new: true }
		)
		res.send({todo})
	} catch (error) {
		res.status(400).send(error)
	}
});

app.delete('/todos/removeAll', (req, resgit) => {
    Todo.remove({}, docs => {
        res.status(200).send(docs);
    });
});

//POST /users
app.post('/users', async (req, res) => {
    try {
        const user = new User(
            _.pick(req.body, ['name', 'age', 'email', 'password'])
        );
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

//POST /users/login {email, password}
app.post('/users/login', async (req, res) => {
    try {
        const body = new User(_.pick(req.body, ['email', 'password']));
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(400).send();
    }
});

app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (error) {
        res.status(400).send();
    }
});

app.delete('/users/removeAll', (req, resgit) => {
    User.remove({}, docs => {
        res.status(200).send(docs);
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };
