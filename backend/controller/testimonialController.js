const ApiError = require('../errors/api-error');
const Testimonial = require('../models/Testimonial');

module.exports.addTestimonial = async (req, res, next) => {
  try {
    // Convert category from string to number if needed (for backward compatibility)
    const body = { ...req.body };
    if (body.category !== undefined) {
      if (typeof body.category === 'string') {
        // Convert old string format to new number format
        if (body.category === 'Home Page') body.category = 1;
        else if (body.category === 'About Us') body.category = 2;
        else if (body.category === 'Both') body.category = 3;
      }
      const categoryNum = parseInt(body.category, 10);
      // Ensure category is valid (1, 2, or 3)
      if ([1, 2, 3].includes(categoryNum)) {
        body.category = categoryNum;
      } else {
        body.category = 1; // Default to Home Page
      }
    }
    
    const newTestimonial = new Testimonial(body);
    await newTestimonial.save();
    res.status(200).json({ message: 'Testimonial added successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.addAllTestimonials = async (req, res) => {
  try {
    await Testimonial.deleteMany();
    const result = await Testimonial.insertMany(req.body);
    res.status(200).json({ message: 'Testimonials inserted successfully', result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllTestimonials = async (req, res, next) => {
  try {
    const result = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

module.exports.getActiveTestimonials = async (req, res, next) => {
  try {
    const { category } = req.query;
    const categoryNum = category ? parseInt(category, 10) : null;
    
    // Build query filter - always filter by status first
    let queryFilter = { status: "Show" };
    
    // If category is specified, filter by category
    // 1 = Home Page, 2 = About Us, 3 = Both
    if (categoryNum === 1) {
      // Show testimonials with category 1 (Home Page) or 3 (Both), or null/undefined (for backward compatibility)
      queryFilter = {
        status: "Show",
        $or: [
          { category: 1 }, 
          { category: 3 },
          { category: null },
          { category: { $exists: false } }
        ],
      };
    } else if (categoryNum === 2) {
      // Show testimonials with category 2 (About Us) or 3 (Both) only
      queryFilter = {
        status: "Show",
        category: { $in: [2, 3] }
      };
    }
    
    const result = await Testimonial.find(queryFilter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

module.exports.getSingleTestimonial = async (req, res, next) => {
  try {
    const result = await Testimonial.findById(req.params.id);
    if (!result) {
      throw new ApiError(404, 'Testimonial not found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.updateTestimonial = async (req, res, next) => {
  try {
    const isExist = await Testimonial.findOne({ _id: req.params.id });
    if (!isExist) {
      throw new ApiError(404, 'Testimonial not found !');
    }
    
    // Convert category from string to number if needed (for backward compatibility)
    const updateData = { ...req.body };
    if (updateData.category !== undefined && updateData.category !== null) {
      if (typeof updateData.category === 'string') {
        // Convert old string format to new number format
        if (updateData.category === 'Home Page') updateData.category = 1;
        else if (updateData.category === 'About Us') updateData.category = 2;
        else if (updateData.category === 'Both') updateData.category = 3;
      }
      const categoryNum = parseInt(updateData.category, 10);
      // Ensure category is valid (1, 2, or 3)
      if ([1, 2, 3].includes(categoryNum)) {
        updateData.category = categoryNum;
      } else {
        updateData.category = 1; // Default to Home Page
      }
    }
    
    const result = await Testimonial.findOneAndUpdate({ _id: req.params.id }, updateData, { new: true });
    res.status(200).json({ status: 'success', message: 'Testimonial update successfully', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTestimonial = async (req, res, next) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Testimonial delete successfully' });
  } catch (error) {
    next(error);
  }
};

