const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema); //'Blog' will be pluralised and then looked in db for that cluster so the name is very important!
module.exports = Blog;