class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static registrer(req, res) {
    res.render("auth/register");
  }
}

module.exports = AuthController;
