// add module to check if user is logged in
module.exports.checkAuth = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    console.log("[checkAuth] User not logged in");
    res.redirect("/login");
};