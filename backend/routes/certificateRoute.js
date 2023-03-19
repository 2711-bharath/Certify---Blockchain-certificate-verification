const express = require('express');
const { addCertificate, updateCertificate, getCertificates, mineBlock, getblockDataForMining } = require('../controllers/certificateController');

const router = express.Router();

router.post('/', addCertificate);
router.patch('/', updateCertificate);
router.get("/getCertificateData/:id", getblockDataForMining);
router.post("/mineBlock", mineBlock);
router.get("/:uid/:shared", getCertificates);


module.exports = router;
