const express = require('express');

//express app
const app = express();

//set view engine
app.set('view engine', 'ejs'); //will automatically look into views folder

//listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Title 1', snippet: 'This is a smal snippet #1'},
        {title: 'Title 2', snippet: 'This is a smal snippet #2'},
        {title: 'Title 3', snippet: 'This is a smal snippet #3'},
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'New Blog' });
});

// default 404 page 
app.use((req, res) => { //fires for every request made, but only if the request reaches this point!
    res.status(404).render('404', { title: '404' });
});
