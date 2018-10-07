const express	= require('express');
const utils = require('../utils/utils');

const app = express();

app.get('/', (req, res) => {
	res.status(404).send({
        error: 'Page not found',
        name: 'Todo App v1.0'
    });
})

app.get('/users', (req, res) => {
    let users = [];
    for (var i = 0; i < 5; i++) {
        users[i] = utils.createUser('User '+i, ((35 * i + 3) % 30), 'Chicago');
    };
    res.send(users);
});

app.listen(3000);
module.exports.app = app;
