const express = require('express');
const { createContactMessage } = require('../controllers/contactMessageController');

const router = express.Router();

router.post('/contact', createContactMessage);

module.exports = router;
