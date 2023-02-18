const express = require("express");
const {
  signupController,
  loginController,
  updateController,
  getUserController,
} = require("../controllers/user");

const router = express.Router();

router.get("/:uid", getUserController);
router.post("/login", loginController);
router.post("/signup", signupController);
router.patch("/update", updateController);

module.exports = router;
