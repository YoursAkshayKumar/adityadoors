const express = require("express");
const router = express.Router();
const {
  addMeasurement,
  getAllMeasurements,
  getSingleMeasurement,
  updateMeasurement,
  deleteMeasurement,
} = require("../controller/measurementController");

router.post("/add", addMeasurement);
router.get("/all", getAllMeasurements);
router.get("/get/:id", getSingleMeasurement);
router.patch("/edit/:id", updateMeasurement);
router.delete("/delete/:id", deleteMeasurement);

module.exports = router;

