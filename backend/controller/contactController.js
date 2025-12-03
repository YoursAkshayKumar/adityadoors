const ApiError = require("../errors/api-error");
const Contact = require("../models/Contact");

module.exports.addContact = async (req, res, next) => {
  try {
    const contactData = req.body;

    // Validate required fields
    if (!contactData.name || !contactData.name.trim()) {
      return next(new ApiError(400, "Name is required"));
    }
    if (!contactData.email || !contactData.email.trim()) {
      return next(new ApiError(400, "Email is required"));
    }
    if (!contactData.subject || !contactData.subject.trim()) {
      return next(new ApiError(400, "Subject is required"));
    }
    if (!contactData.message || !contactData.message.trim()) {
      return next(new ApiError(400, "Message is required"));
    }

    // Transform and clean data
    const transformedData = {
      name: contactData.name.trim(),
      email: contactData.email.trim().toLowerCase(),
      subject: contactData.subject.trim(),
      message: contactData.message.trim(),
      status: "pending",
    };

    // Only add phone if provided
    if (contactData.phone && contactData.phone.trim()) {
      transformedData.phone = contactData.phone.trim();
    }

    const contact = new Contact(transformedData);
    await contact.save();

    res.status(201).json({
      success: true,
      message: "Contact message submitted successfully",
      result: contact,
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

module.exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      result: contacts,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports.getSingleContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return next(new ApiError(404, "Contact not found"));
    }

    res.status(200).json({
      success: true,
      result: contact,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports.updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const contact = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!contact) {
      return next(new ApiError(404, "Contact not found"));
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      result: contact,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return next(new ApiError(404, "Contact not found"));
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

