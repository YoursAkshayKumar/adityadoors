const ApiError = require("../errors/api-error");
const Measurement = require("../models/Measurement");

module.exports.addMeasurement = async (req, res, next) => {
  try {
    const measurementData = req.body;

    // Validate required fields
    if (!measurementData.name || !measurementData.name.trim()) {
      return next(new ApiError(400, "Name is required"));
    }
    if (!measurementData.email || !measurementData.email.trim()) {
      return next(new ApiError(400, "Email is required"));
    }
    if (!measurementData.phone || !measurementData.phone.trim()) {
      return next(new ApiError(400, "Phone is required"));
    }

    // Transform and clean data - only include fields that are provided
    const transformedData = {
      name: measurementData.name.trim(),
      email: measurementData.email.trim().toLowerCase(),
      phone: measurementData.phone.trim(),
      status: "pending",
    };

    // Only add optional fields if they have values
    if (measurementData.address && measurementData.address.trim()) {
      transformedData.address = measurementData.address.trim();
    }
    if (measurementData.preferredDate) {
      transformedData.preferredDate = measurementData.preferredDate;
    }
    if (measurementData.preferredTime && measurementData.preferredTime.trim()) {
      transformedData.preferredTime = measurementData.preferredTime.trim();
    }

    const measurement = new Measurement(transformedData);
    await measurement.save();

    res.status(201).json({
      success: true,
      message: "Measurement request submitted successfully",
      result: measurement,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return next(new ApiError(400, errors.join(', ')));
    }
    next(new ApiError(500, error.message));
  }
};

module.exports.getAllMeasurements = async (req, res, next) => {
  try {
    const measurements = await Measurement.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      result: measurements,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports.getSingleMeasurement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const measurement = await Measurement.findById(id);

    if (!measurement) {
      return next(new ApiError(404, "Measurement not found"));
    }

    res.status(200).json({
      success: true,
      result: measurement,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports.updateMeasurement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const measurement = await Measurement.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!measurement) {
      return next(new ApiError(404, "Measurement not found"));
    }

    res.status(200).json({
      success: true,
      message: "Measurement updated successfully",
      result: measurement,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports.deleteMeasurement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const measurement = await Measurement.findByIdAndDelete(id);

    if (!measurement) {
      return next(new ApiError(404, "Measurement not found"));
    }

    res.status(200).json({
      success: true,
      message: "Measurement deleted successfully",
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

