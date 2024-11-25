const {
  createUniversity,
  getAllUniversities,
  getUniversityByName,
  getUniversityById
} = require('../controller/university.controller');
const auth = require('../middleware/auth.middleware');
const express = require('express');
const router = express.Router();

router.post('/', auth, createUniversity);

router.get('/', auth, getAllUniversities);

router.get('/name/:name', auth, getUniversityByName);

router.get('/universityId/:id', auth, getUniversityById);

module.exports = router;