const express = require('express');
const router = express.Router();

const getUser = () => require('../database/user.json');
const getSearchCategories = () => require('../database/searchCategories.json');

router.get('/user', (req, res) => res.json(getUser().user));
router.get('/searchCategories', (req, res) => res.json(getSearchCategories().categories));

module.exports = router;
