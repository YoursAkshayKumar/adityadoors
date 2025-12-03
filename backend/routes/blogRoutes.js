const express = require('express');
const router = express.Router();
const {
  addBlog,
  addAllBlogs,
  getAllBlogs,
  getSingleBlog,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require('../controller/blogController');

router.post('/add', addBlog);
router.post('/add-all', addAllBlogs);
router.get('/all', getAllBlogs);
router.get('/get/:id', getSingleBlog);
router.get('/slug/:slug', getBlogBySlug);
router.patch('/edit/:id', updateBlog);
router.delete('/delete/:id', deleteBlog);

module.exports = router;