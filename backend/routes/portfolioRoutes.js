const express = require('express');
const router = express.Router();
const {
  addPortfolio,
  getAllPortfolios,
  getActivePortfolios,
  getSinglePortfolio,
  updatePortfolio,
  deletePortfolio,
} = require('../controller/portfolioController');

router.post('/add', addPortfolio);
router.get('/all', getAllPortfolios);
router.get('/active', getActivePortfolios);
router.get('/get/:id', getSinglePortfolio);
router.patch('/edit/:id', updatePortfolio);
router.delete('/delete/:id', deletePortfolio);

module.exports = router;

