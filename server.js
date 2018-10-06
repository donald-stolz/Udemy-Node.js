// import express from 'express';
// import hbs from 'hbs';
const express    = require('express');
const hbs       = require('hbs');
const fs        = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(`Unable to append to server.log: ${err}`);
        } else {
            console.log("Wrote to server.log: \n" + log);
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear(); 
});

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello World'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/error', (rep, res) => {
    res.send({
        errormsg: "Unable to handle request"
    });
});

app.listen(port, () => {
    console.log(`Server up on port ${port}`);
});