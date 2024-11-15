const express = require("express");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.get("/login", AuthController.login);
router.post("/login", AuthController.loginUser);
router.get("/register", AuthController.registrer);
router.post("/register", AuthController.registrerUser);
router.get("/logout", AuthController.logout);

module.exports = router;
