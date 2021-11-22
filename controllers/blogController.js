const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blogs/details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => {
            res.render('404', { title: 'Blog Not Found' });
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' }) //because front-end
        })
        .catch((err) => {
            console.log(err)
        })
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'New Blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err)
        })
}

const blog_edit_get = (req, res) => {
    console.log(req.params); //doesn't log anything...
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            console.log(result); //doesn't log anything either...
            res.render('blogs/edit', { blog: result, title: 'Edit Blog' });
        })
        .catch((err) => {
            console.log(err)
        })
}

const blog_edit_put = (req, res) => {
    const id = req.params.id;
    console.log('These are the request params: ', req.params);
    Blog.findByIdAndUpdate(id, { title: req.params.body.title, snippet: req.params.body.snippet, body: req.params.body.body }, { new: true, useFindAndModify: false }, (err, data) => {
        if (err){
            console.log(err)
        } else {
            console.log("Sucess")
            console.log(data)
            res.render('blogs/details', { blog: data, title: 'Blog Details' })
        }
    });
}

module.exports = {
    blog_index,
    blog_details,
    blog_delete,
    blog_create_get,
    blog_create_post,
    blog_edit_get,
    blog_edit_put
}