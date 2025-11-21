const ApiError = require('../errors/api-error');
const Blog = require('../models/Blog');

module.exports.addBlog = async (req, res, next) => {
  try {
    const isExist = await Blog.findOne({ slug: req.body.slug });
    if (isExist) {
      throw new ApiError(403, 'Blog with this slug already exists');
    }
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(200).json({ message: 'Blog added successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.addAllBlogs = async (req, res) => {
  try {
    await Blog.deleteMany();
    const result = await Blog.insertMany(req.body);
    res.status(200).json({ message: 'Blogs inserted successfully', result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllBlogs = async (req, res, next) => {
  try {
    const result = await Blog.find().sort({ updatedAt: -1 });
    res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

module.exports.getSingleBlog = async (req, res, next) => {
  try {
    const result = await Blog.findById(req.params.id);
    if (!result) {
      throw new ApiError(404, 'Blog not found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.updateBlog = async (req, res, next) => {
  try {
    const isExist = await Blog.findOne({ _id: req.params.id });
    if (!isExist) {
      throw new ApiError(404, 'Blog not found !');
    }
    const result = await Blog.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(200).json({ status: 'success', message: 'Blog update successfully', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteBlog = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Blog delete successfully' });
  } catch (error) {
    next(error);
  }
};