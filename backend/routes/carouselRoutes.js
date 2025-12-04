const express = require("express");
const {
  addCarousel,
  getAllCarousels,
  getActiveCarousels,
  getSingleCarousel,
  updateCarousel,
  deleteCarousel,
} = require("../controller/carouselController");

// router
const router = express.Router();

// add a carousel
router.post("/add", addCarousel);

// get all carousels
router.get("/all", getAllCarousels);

// get active carousels (public)
router.get("/active", getActiveCarousels);

// get single carousel
router.get("/get/:id", getSingleCarousel);

// update carousel
router.patch("/edit/:id", updateCarousel);

// delete carousel
router.delete("/delete/:id", deleteCarousel);

module.exports = router;

