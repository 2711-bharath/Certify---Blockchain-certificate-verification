const express = require("express");
const {
  signupController,
  loginController,
  updateController,
} = require("../controllers/user");

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);
router.put("/update", updateController);

module.exports = router;
