const Tought = require("../models/Tought");
const User = require("../models/User");

class ToughtsController {
  static showToughts(req, res) {
    console.log("showToughts() - start");
    res.render("toughts/home");
  }
}

module.exports = ToughtsController;
