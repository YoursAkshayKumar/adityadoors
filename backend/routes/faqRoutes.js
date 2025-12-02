const express = require('express');
const router = express.Router();
const {
  addFAQ,
  addAllFAQs,
  getAllFAQs,
  getActiveFAQs,
  getSingleFAQ,
  updateFAQ,
  deleteFAQ,
} = require('../controller/faqController');

router.post('/add', addFAQ);
router.post('/add-all', addAllFAQs);
router.get('/all', getAllFAQs);
router.get('/active', getActiveFAQs);
router.get('/get/:id', getSingleFAQ);
router.patch('/edit/:id', updateFAQ);
router.delete('/delete/:id', deleteFAQ);

module.exports = router;

