const {
  createContactUs,
  getAllContactUsMessages
} = require('../controller/contactus.controller');
const auth = require('../middleware/auth.middleware');
const express = require('express');
const router = express.Router();

router.post('/', auth, createContactUs);

router.get('/', auth, getAllContactUsMessages);

module.exports = router;