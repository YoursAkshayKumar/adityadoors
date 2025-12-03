const ApiError = require('../errors/api-error');
const Blog = require('../models/Blog');
const slugify = require('slugify');

module.exports.addBlog = async (req, res, next) => {
  try {
    // Generate slug if not provided
    if (!req.body.slug && req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }
    
    // Ensure slug is unique
    let uniqueSlug = req.body.slug;
    let counter = 1;
    while (await Blog.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${req.body.slug}-${counter}`;
      counter++;
    }
    req.body.slug = uniqueSlug;
    
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
    const blogs = await Blog.find().sort({ updatedAt: -1 });
    
    // Generate slugs for blogs that don't have them (only update, don't wait for all)
    blogs.forEach(async (blog) => {
      if (!blog.slug && blog.title) {
        let generatedSlug = slugify(blog.title, { lower: true, strict: true });
        let uniqueSlug = generatedSlug;
        let counter = 1;
        
        // Ensure slug is unique
        let existingBlog = await Blog.findOne({ slug: uniqueSlug, _id: { $ne: blog._id } });
        while (existingBlog) {
          uniqueSlug = `${generatedSlug}-${counter}`;
          counter++;
          existingBlog = await Blog.findOne({ slug: uniqueSlug, _id: { $ne: blog._id } });
        }
        
        blog.slug = uniqueSlug;
        await blog.save();
      }
    });
    
    res.status(200).json({ success: true, result: blogs });
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

module.exports.getBlogBySlug = async (req, res, next) => {
  try {
    // Decode the slug parameter in case it's URL encoded
    let slug;
    try {
      slug = decodeURIComponent(req.params.slug);
    } catch (e) {
      slug = req.params.slug;
    }
    
    // Try to find by slug first (exact match)
    let result = await Blog.findOne({ slug: slug });
    
    // If not found, try case-insensitive match
    if (!result) {
      result = await Blog.findOne({ slug: new RegExp(`^${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') });
    }
    
    // If not found by slug, try to find by ID (for backward compatibility with old URLs)
    if (!result && /^[a-f\d]{24}$/i.test(slug)) {
      result = await Blog.findById(slug);
    }
    
    // If still not found, try to find by matching title (convert slug back to title-like search)
    if (!result) {
      // Convert slug back to words and search by title
      const titleWords = slug.split('-').join(' ');
      result = await Blog.findOne({ 
        title: new RegExp(titleWords, 'i')
      });
    }
    
    if (!result) {
      throw new ApiError(404, 'Blog not found');
    }
    
    // If blog doesn't have a slug, generate and save it
    if (!result.slug && result.title) {
      let generatedSlug = slugify(result.title, { lower: true, strict: true });
      let uniqueSlug = generatedSlug;
      let counter = 1;
      
      while (await Blog.findOne({ slug: uniqueSlug, _id: { $ne: result._id } })) {
        uniqueSlug = `${generatedSlug}-${counter}`;
        counter++;
      }
      
      result.slug = uniqueSlug;
      await result.save();
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