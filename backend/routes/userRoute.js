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
router.put("/update", updateController);

module.exports = router;
