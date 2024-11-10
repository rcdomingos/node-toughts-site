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

  static async registrerUser(req, res) {
    const { name, email, password, passwordConfirm } = req.body;

    // password match validation
    if (password !== passwordConfirm) {
      req.flash("message", "Senhas não conferem, tente novamente!");
      res.render("auth/register");
      return;
    }

    //validar se o usuario ja existe
    const checkIfUserExists = await User.findOne({ where: { email: email } });
    if (checkIfUserExists) {
      req.flash("message", "Email ja cadastrado, tente novamente!");
      res.render("auth/register");
      return;
    }

    // criptografar a senha
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // criar o usuario
    const user = {
      name,
      email,
      password: hash,
    };

    try {
      const createdUser = await User.create(user);
      req.flash("message", "Cadastrado com sucesso!");

      // inicializar a sessao
      req.session.userId = createdUser.id;
      // salvar a sessao
      req.session.save(() => {
        res.redirect("/toughts");
      });
    } catch (error) {
      console.error("Error creating user:", error);
      req.flash("message", "Erro ao criar usuário, tente novamente!");
      res.render("auth/register");
      return;
    }
  }
}

module.exports = AuthController;
