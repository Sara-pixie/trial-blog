const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', (req, res) => blogController.blog_index );
router.get('/create', (req, res) => blogController.blog_create_get);
router.get('/:id', (req, res) => blogController.blog_details);
router.delete('/:id', (req, res) => blogController.blog_delete);
router.post('/', (req, res) => blogController.blog_create_post);

module.exports = router;