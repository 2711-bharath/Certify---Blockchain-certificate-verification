const express = require("express");
const {
  addCertificate,
  updateCertificate,
  getCertificates,
} = require("../controllers/certificateController");

const router = express.Router();

router.post("/", addCertificate);
router.patch("/", updateCertificate);
router.get("/:uid/:status", getCertificates);

module.exports = router;
