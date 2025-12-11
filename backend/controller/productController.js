const Product = require("../models/Product");
// const Brand = require("../models/Brand");
const Category = require("../models/Category");
const ApiError = require("../errors/api-error");
const slugify = require("slugify");

const generateUniqueSlug = async (baseSlug, excludeId = null) => {
  let uniqueSlug = slugify(baseSlug, { lower: true, strict: true });
  let counter = 1;
  // Ensure uniqueness; allow excluding current product when updating
  while (await Product.findOne({ slug: uniqueSlug, _id: { $ne: excludeId } })) {
    uniqueSlug = `${slugify(baseSlug, { lower: true, strict: true })}-${counter}`;
    counter += 1;
  }
  return uniqueSlug;
};

// addAllProducts
module.exports.addProduct = async (req, res, next) => {
  try {
    const imageURLs = [req.body.image, ...(req.body.relatedImages || [])];

    const payload = {
      ...req.body,
      relatedImages: imageURLs,
    };

    // Auto-generate slug if not provided
    if (!payload.slug && payload.title) {
      payload.slug = await generateUniqueSlug(payload.title);
    } else if (payload.slug) {
      payload.slug = await generateUniqueSlug(payload.slug);
    }

    const newProduct = new Product(payload);
    await newProduct.save();
    const { _id: productId, category } = newProduct;
    //update Brand
    // await Brand.updateOne(
    //   { _id: brand.id },
    //   { $push: { products: productId } }
    // );
    //Category update
    await Category.updateOne(
      { _id: category.id },
      { $push: { products: productId } }
    );

    res.send({
      message: "Product added successfully",
    });
  } catch (err) {
    next(err);
  }
};
// addAllProducts
module.exports.addAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    const result = await Product.insertMany(req.body);
    res.send({
      message: "Products added successfully",
      result,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// get all show products
module.exports.getShowingProducts = async (req, res, next) => {
  try {
    const result = await Product.find({ status: "active" });
    res.json({
      success: true,
      products: result,
    });
  } catch (error) {
    next(error);
  }
};

// get all show products
module.exports.getPopularProducts = async (req, res, next) => {
  try {
    const result = await Product.find({ 
      status: "active",
      isPopular: true 
    })
    .sort({ createdAt: -1 }) // Sort by latest first
    .limit(8); // Limit to 8 products
    res.json({
      success: true,
      products: result,
    });
  } catch (error) {
    next(error);
  }
};

// get all products
module.exports.getAllProducts = async (req, res, next) => {
  try {
    const result = await Product.find({});
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// getDiscountProduct
module.exports.getDiscountProduct = async (req, res, next) => {
  try {
    const discountProducts = await Product.find({ discount: { $gt: 0 } });
    res.json({
      success: true,
      products: discountProducts,
    });
  } catch (err) {
    next(err);
  }
};

// getDiscountProduct
module.exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// get related products
module.exports.getRelatedProducts = async (req, res, next) => {
    const { tags } = req.query;
    const queryTags = tags?.split(",");
    try {
    const product = await Product.find({ tags: { $in: queryTags || [] } }).limit(4);
    res.status(200).json({
      status: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

// update product
exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Product delete successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const isExist = await Product.findOne({ _id: req.params.id });

    if (!isExist) {
      throw new ApiError(404, "Product not found !");
    }

    const updatePayload = { ...req.body };

    if (updatePayload.slug === "") {
      // If cleared, regenerate from title
      updatePayload.slug = await generateUniqueSlug(isExist.title, req.params.id);
    } else if (updatePayload.slug) {
      updatePayload.slug = await generateUniqueSlug(updatePayload.slug, req.params.id);
    } else if (!isExist.slug && isExist.title) {
      updatePayload.slug = await generateUniqueSlug(isExist.title, req.params.id);
    }

    const result = await Product.findOneAndUpdate(
      { _id: req.params.id },
      updatePayload,
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get single product by slug
module.exports.getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    let product = await Product.findOne({ slug });

    // Fallback: if not found and looks like an ObjectId, try by id to support old links
    if (!product && slug?.match(/^[a-fA-F0-9]{24}$/)) {
      product = await Product.findById(slug);
    }

    // Fallback: match by slugified title for records missing slug
    if (!product && slug) {
      const titleRegex = new RegExp(
        "^" + slug.replace(/-/g, "[\\s-]+") + "$",
        "i"
      );
      product = await Product.findOne({ title: { $regex: titleRegex } });
    }

    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};
