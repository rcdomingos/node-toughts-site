const express = require("express");
const ToughtsController = require("../controllers/ToughtsController");

const router = express.Router();

// helpers
const checkAuth = require("../helpers/auth").checkAuth;

//rotas protegidas
router.get("/add", checkAuth, ToughtsController.createToughts);
router.post("/add", checkAuth, ToughtsController.createToughtsSave);
router.get("/dashboard", checkAuth, ToughtsController.dashboard);
router.get("/", ToughtsController.showToughts);

module.exports = router;
