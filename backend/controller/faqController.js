const ApiError = require('../errors/api-error');
const FAQ = require('../models/FAQ');

module.exports.addFAQ = async (req, res, next) => {
  try {
    const newFAQ = new FAQ(req.body);
    await newFAQ.save();
    res.status(200).json({ message: 'FAQ added successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.addAllFAQs = async (req, res) => {
  try {
    await FAQ.deleteMany();
    const result = await FAQ.insertMany(req.body);
    res.status(200).json({ message: 'FAQs inserted successfully', result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllFAQs = async (req, res, next) => {
  try {
    const result = await FAQ.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

module.exports.getActiveFAQs = async (req, res, next) => {
  try {
    const result = await FAQ.find({ status: "Show" }).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

module.exports.getSingleFAQ = async (req, res, next) => {
  try {
    const result = await FAQ.findById(req.params.id);
    if (!result) {
      throw new ApiError(404, 'FAQ not found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.updateFAQ = async (req, res, next) => {
  try {
    const isExist = await FAQ.findOne({ _id: req.params.id });
    if (!isExist) {
      throw new ApiError(404, 'FAQ not found !');
    }
    const result = await FAQ.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(200).json({ status: 'success', message: 'FAQ update successfully', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteFAQ = async (req, res, next) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'FAQ delete successfully' });
  } catch (error) {
    next(error);
  }
};

