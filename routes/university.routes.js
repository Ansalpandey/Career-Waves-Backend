const {
  createUniversity,
  getAllUniversities,
  getUniversityByName,
} = require('../controller/university.controller');
const auth = require('../middleware/auth.middleware');
const express = require('express');
const router = express.Router();

router.post('/', auth, createUniversity);

router.get('/', auth, getAllUniversities);

router.get('/:name', auth, getUniversityByName);

module.exports = router;