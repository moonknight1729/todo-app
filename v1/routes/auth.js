// const Login=require('../controllers/auth')
const Register = require("../controllers/auth");
const Login = require("../controllers/auth");
const { check } = require("express-validator");

const express = require("express");
const router = express.Router();

// router.post(
//   "/signup",
//   check("email")
//     .isEmail()
//     .withMessage("Enter a valid email address")
//     .normalizeEmail(),
//   check("first_name")
//     .not()
//     .isEmpty()
//     .withMessage("You first name is required")
//     .trim()
//     .escape(),
//   check("last_name")
//     .not()
//     .isEmpty()
//     .withMessage("You last name is required")
//     .trim()
//     .escape(),
//   check("password")
//     .notEmpty()
//     .isLength({ min: 8 })
//     .withMessage("Must be at least 8 chars long"),
//   Register
// );
router.post("/signup", Register);

router.post("/login", Login);

module.exports = router;
