const ApiError = require('../errors/api-error');
const Portfolio = require('../models/Portfolio');

module.exports.addPortfolio = async (req, res, next) => {
  try {
    const newPortfolio = new Portfolio(req.body);
    await newPortfolio.save();
    res.status(200).json({ message: 'Portfolio added successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllPortfolios = async (req, res, next) => {
  try {
    const result = await Portfolio.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

module.exports.getActivePortfolios = async (req, res, next) => {
  try {
    const result = await Portfolio.find({ status: "Show" }).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

module.exports.getSinglePortfolio = async (req, res, next) => {
  try {
    const result = await Portfolio.findById(req.params.id);
    if (!result) {
      throw new ApiError(404, 'Portfolio not found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.updatePortfolio = async (req, res, next) => {
  try {
    const isExist = await Portfolio.findOne({ _id: req.params.id });
    if (!isExist) {
      throw new ApiError(404, 'Portfolio not found !');
    }
    const result = await Portfolio.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(200).json({ status: 'success', message: 'Portfolio update successfully', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports.deletePortfolio = async (req, res, next) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Portfolio delete successfully' });
  } catch (error) {
    next(error);
  }
};

