const ApiError = require("../errors/api-error");
const Inquiry = require("../models/Inquiry");

module.exports.addInquiry = async (req, res, next) => {
  try {
    const inquiryData = req.body;

    // Validate required fields
    if (!inquiryData.name || !inquiryData.name.trim()) {
      return next(new ApiError(400, "Name is required"));
    }
    if (!inquiryData.email || !inquiryData.email.trim()) {
      return next(new ApiError(400, "Email is required"));
    }
    if (!inquiryData.phone || !inquiryData.phone.trim()) {
      return next(new ApiError(400, "Phone is required"));
    }
    if (!inquiryData.subject || !inquiryData.subject.trim()) {
      return next(new ApiError(400, "Subject is required"));
    }
    if (!inquiryData.message || !inquiryData.message.trim()) {
      return next(new ApiError(400, "Message is required"));
    }
    if (!inquiryData.inquiryType) {
      return next(new ApiError(400, "Inquiry type is required"));
    }

    // Transform product data from nested object to flat fields
    // Support both new format (flat) and old format (nested product object)
    const transformedData = {
      name: inquiryData.name.trim(),
      email: inquiryData.email.trim().toLowerCase(),
      phone: inquiryData.phone.trim(),
      subject: inquiryData.subject.trim(),
      message: inquiryData.message.trim(),
      inquiryType: inquiryData.inquiryType,
      // Extract from nested product object if it exists
      productName: inquiryData.productName || (inquiryData.product?.name || ""),
      productCategory: inquiryData.productCategory || (inquiryData.product?.category || ""),
      productPrice: inquiryData.productPrice || (inquiryData.product?.price || null),
      // Keep nested product for backward compatibility
      product: inquiryData.product || null,
    };

    // Validate productName is present
    if (!transformedData.productName || !transformedData.productName.trim()) {
      return next(new ApiError(400, "Product name is required"));
    }

    const inquiry = new Inquiry(transformedData);
    await inquiry.save();

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      result: inquiry,
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

module.exports.getAllInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      result: inquiries,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports.getSingleInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return next(new ApiError(404, "Inquiry not found"));
    }

    res.status(200).json({
      success: true,
      result: inquiry,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports.updateInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!inquiry) {
      return next(new ApiError(404, "Inquiry not found"));
    }

    res.status(200).json({
      success: true,
      message: "Inquiry updated successfully",
      result: inquiry,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports.deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return next(new ApiError(404, "Inquiry not found"));
    }

    res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

