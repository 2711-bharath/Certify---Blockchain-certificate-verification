const express = require('express');
const { addCertificate } = require('../controllers/certificateController');

const router = express.Router();

router.post('/', addCertificate);

module.exports = router;