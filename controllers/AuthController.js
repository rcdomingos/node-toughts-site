const User = require("../models/User");
const bcrypt = require("bcryptjs");

class AuthController {
  /**
   * @function login
   * @description Renderiza a página de login
   * @param {Request} req - Request da página
   * @param {Response} res - Response da página
   */

  static login(req, res) {
    res.render("auth/login");
  }

  static registrer(req, res) {
    res.render("auth/register");
  }

  static registrerUser(req, res) {
   const { name, email, password, passwordConfirm } = req.body;

   // password match validation
   if (password !== passwordConfirm) {
     req.flash("message", "Senhas não conferem, tente novamente!");
     res.render("auth/register");
     return;
   }
  }
}


module.exports = AuthController;
