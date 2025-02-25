const express = require('express');
const { createContactMessage, getAllContactMessages } = require('../controllers/contactMessageController');

const router = express.Router();

router.post('/contact', createContactMessage);
router.get('/contact/messages', getAllContactMessages);

module.exports = router;
