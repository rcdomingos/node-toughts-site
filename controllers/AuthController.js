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
      console.log(`User id: ${req.session.userId}`);
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

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    //find user by email
    const user = await User.findOne({ where: { email: email } });

    // verify if user exists and passaword is valid
    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        console.log("User and Password valid");
        req.session.userId = user.id;
        req.session.save(() => {
          res.redirect("/toughts");
        });
        return;
      }
      console.log("Password Invalid");
    } else {
      console.log("User not found");
    }

    req.flash("message", "Usuario ou senha incorretos!");
    res.render("auth/login");
    return;
  }
}

module.exports = AuthController;
