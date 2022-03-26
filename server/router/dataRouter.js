const express = require('express');
const router = express.Router();

const getUser = () => require('../database/user.json');
const getSearchCategories = () => require('../database/searchCategories.json');
const getAutoCompleteWords = () => require('../database/autoComplete.json');

router.get('/user', (req, res) => res.json(getUser().user));
router.get('/searchCategories', (req, res) => res.json(getSearchCategories().categories));
router.get('/autoComplete', (req, res) => {
  const category = req.query.category;
  const inputValue = req.query.keyword;
  const words = getAutoCompleteWords()[inputValue] || ['자동완성없음'];
  res.json(words);
});

module.exports = router;
