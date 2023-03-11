const express = require("express");
const {
  addCertificate,
  getCertificates,
} = require("../controllers/certificateController");

const router = express.Router();

router.get("/:uid/:shared", getCertificates);
router.post("/", addCertificate);

module.exports = router;
