const mongoose = require('mongoose');
const valid = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  sku: {
    type: String,
    required: false,
    trim: true,
  },
  title:{
    type:String,
    required:true,
    trim: true,
  },
  parent:{
    type:String,
    required: true,
    trim:true,
  },
  children:{
    type:String,
    required: false,
    trim:true,
  },
  tags: {
    type: [String],
    required: false,
    default: [],
  },
  image:{
    type:String,
    required: true,
    validate: [valid.isURL, "wrong url"]
  },
  originalPrice: {
    type: Number,
    required: false,
    min: [0, "Price can't be negative"],
  },
  price: {
    type: Number,
    required: false,
    default: undefined,
    min: [0, "Price can't be negative"],
  },
  discount: {
    type: Number,
    required: false,
    default: undefined,
  },
  relatedImages: [{
    type: String,
    required: false,
    validate: [valid.isURL, "wrong url"]
  }],
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: ObjectId,
      ref: "Category",
      required: true,
    }
  },
  unit: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  colors: {
    type: [String],
    required: false,
    default: [],
  },
  brand: {
    name: {
      type: String,
      required: false,
    },
    id: {
      type: ObjectId,
      ref: "Brand",
      required: false,
    }
  },
  type:String,
  itemInfo:String,
  onSale:String,
  isOnSale: {
    type: Boolean,
    required: false,
    default: false,
  },
  isPopular: {
    type: Boolean,
    required: false,
    default: false,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inActive'],
  },
  features: {
    type: [String],
    required: false,
    default: [],
  },
  specifications: [{
    label: {
      type: String,
      required: false,
      trim: true,
    },
    value: {
      type: String,
      required: false,
      trim: true,
    }
  }],
  fullDescription: {
    type: String,
    required: false,
    trim: true,
  },
},{
  timestamps: true
})

const Product = mongoose.model('Products',productSchema);
module.exports = Product;