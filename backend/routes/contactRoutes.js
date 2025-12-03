const express = require("express");
const router = express.Router();
const {
  addContact,
  getAllContacts,
  getSingleContact,
  updateContact,
  deleteContact,
} = require("../controller/contactController");

router.post("/add", addContact);
router.get("/all", getAllContacts);
router.get("/get/:id", getSingleContact);
router.patch("/edit/:id", updateContact);
router.delete("/delete/:id", deleteContact);

module.exports = router;

