const express = require('express');
const { addCertificate, updateCertificate } = require('../controllers/certificateController');

const router = express.Router();

router.post('/', addCertificate);
router.patch('/', updateCertificate);

module.exports = router;