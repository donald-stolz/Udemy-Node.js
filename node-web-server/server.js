import express from 'express';
import { EAFNOSUPPORT } from 'constants';

const app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/error', (rep, res) => {
    res.send({
        errormsg: "Unable to handle request"
    });
});

app.listen(3000, () => {
    console.log('Server up on port 3000');
});