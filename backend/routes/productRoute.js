const express = require("express");
const {
  addProduct,
  addAllProducts,
  getShowingProducts,
  getPopularProducts,
  getDiscountProduct,
  getSingleProduct,
  getRelatedProducts,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductBySlug,
} = require("../controller/productController");

// router
const router = express.Router();

// add a products
router.post("/add", addProduct);
// add all products
router.post("/add-all", addAllProducts);
// get all products
router.get("/all", getAllProducts);
// get showing products
router.get("/show", getShowingProducts);
//get Popular Products
router.get("/popular-products", getPopularProducts);
// get discount products
router.get("/discount", getDiscountProduct);
router.get("/relatedProduct", getRelatedProducts);
// slug route must come before id route
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", getSingleProduct);
// delete product
router.delete('/:id', deleteProduct);
// get Single Product
router.patch("/edit-product/:id", updateProduct);

module.exports = router;
