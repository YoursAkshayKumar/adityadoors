const express = require('express');
const router = express.Router();
const {
  addBlog,
  addAllBlogs,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blogController');

router.post('/add', addBlog);
router.post('/add-all', addAllBlogs);
router.get('/all', getAllBlogs);
router.get('/get/:id', getSingleBlog);
router.patch('/edit/:id', updateBlog);
router.delete('/delete/:id', deleteBlog);

module.exports = router;