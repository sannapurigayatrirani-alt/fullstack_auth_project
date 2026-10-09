const express = require("express");

const {
  signup,
  signin,
  getHome,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get(
  "/home",
  authMiddleware,
  getHome
);

module.exports = router;