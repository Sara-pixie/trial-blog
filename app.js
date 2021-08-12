const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const Blog = require('./models/blog');

//express app
const app = express();

//connect to mongodb
const dbPassword = process.env.MY_PASSWORD; //https://medium.com/codait/environment-variables-or-keeping-your-secrets-secret-in-a-node-js-app-99019dfff716
const dbURI = `mongodb+srv://blog-magic-user:${dbPassword}@trialblog.pnwf2.mongodb.net/blog-and-magic?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true,  useUnifiedTopology: true })
    .then((result) => app.listen(3000)) //listen for requests after connecting to DB
    .catch((err) => console.log(err));

//set view engine
app.set('view engine', 'ejs'); //will automatically look into views folder

//middleware & static files
app.use(express.static('public')); //allows front-end to access files in public file
app.use(express.urlencoded({ extended: true })); //parsing the encoded data from front-end to use it as an object later
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs'); //homepage redirects to all blogs
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'New Blog' });
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err)
        })
});

// default 404 page 
app.use((req, res) => { //fires for every request made, but only if the request reaches this point!
    res.status(404).render('404', { title: '404' });
});
