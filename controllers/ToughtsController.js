const Tought = require("../models/Tought");
const User = require("../models/User");

class ToughtsController {
  static showToughts(req, res) {
    console.log("showToughts() - start");
    res.render("toughts/home");
  }

  static async dashboard(req, res) {
    console.log("[dashboard] - start");
    const userId = req.session.userId;
    const user = await User.findOne({
      where: { id: userId },
      include: Tought,
      plain: true,
    });

    // check id user exists
    if (!user) {
      console.log("[dashboard] - User not found");
      req.flash("message", "Nao encontrado");
      res.redirect("/login");
      return;
    }

    // console.log(user.tb_toughts);
    //extract toughts from user
    const toughts = user.tb_toughts.map((result) => result.dataValues);
    console.log(`[dashboard] - Total toughts:  ${toughts.length}`);

    res.render("toughts/dashboard", { toughts });
  }

  static createToughts(req, res) {
    console.log("[createToughts] - start");
    res.render("toughts/create");
  }

  static async createToughtsSave(req, res) {
    const tought = {
      title: req.body.title,
      tbUserId: req.session.userId,
    };

    try {
      await Tought.create(tought);

      req.flash("message", "Pensamento criado com sucesso!");

      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.error("Error creating tought:", error);

      req.flash("message", "Erro ao criar pensamento, tente novamente!");
      res.render("toughts/create");
    }
  }
}

module.exports = ToughtsController;
