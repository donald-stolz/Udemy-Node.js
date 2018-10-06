import express from 'express';

const app = express();

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.send({
        name: 'don'
    })
});

app.get('/about', (req, res) => {
    res.send('about');
});

app.get('/error', (rep, res) => {
    res.send({
        errormsg: "Unable to handle request"
    });
});

app.listen(3000);