const express = require("express");
const { body, validationResult } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

const registrationValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("role")
    .optional()
    .isIn(["Admin", "Manager", "Employee", "Guest"])
    .withMessage("Invalid role"),
];

router.post("/register", registrationValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  await registerUser(req, res);
});

router.post("/login", loginUser);

module.exports = router;
