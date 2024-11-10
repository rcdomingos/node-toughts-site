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
}

module.exports = AuthController;
