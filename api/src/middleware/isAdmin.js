module.exports = async (req, res, next) => {
	if (req.isAuthenticated()) {
		const user = req.user;
		const isAdmin = user.isadmin;

		if (isAdmin) {
			next();
		} else {
			res.status(401).json({ error: "Not authenticated (Not Admin)" });
		}
	} else {
		res.status(401).json({ error: "Not authenticated" });
	}
};
