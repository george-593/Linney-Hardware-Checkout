module.exports = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/api/v1/account/login");
	}
};
