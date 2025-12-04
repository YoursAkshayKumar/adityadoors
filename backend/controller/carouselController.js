const ApiError = require("../errors/api-error");
const Carousel = require("../models/Carousel");

module.exports.addCarousel = async (req, res, next) => {
  try {
    const newCarousel = new Carousel(req.body);
    await newCarousel.save();
    res.status(200).json({ message: "Carousel added successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllCarousels = async (req, res, next) => {
  try {
    const result = await Carousel.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

module.exports.getActiveCarousels = async (req, res, next) => {
  try {
    const result = await Carousel.find({ status: "active" }).sort({
      order: 1,
      createdAt: -1,
    });
    res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

module.exports.getSingleCarousel = async (req, res, next) => {
  try {
    const result = await Carousel.findById(req.params.id);
    if (!result) {
      throw new ApiError(404, "Carousel not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.updateCarousel = async (req, res, next) => {
  try {
    const isExist = await Carousel.findOne({ _id: req.params.id });
    if (!isExist) {
      throw new ApiError(404, "Carousel not found !");
    }
    const result = await Carousel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Carousel update successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCarousel = async (req, res, next) => {
  try {
    await Carousel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Carousel delete successfully" });
  } catch (error) {
    next(error);
  }
};

