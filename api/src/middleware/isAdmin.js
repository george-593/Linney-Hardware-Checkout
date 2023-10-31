const { userIsAdmin } = require("../db/helpers/user");

module.exports = async (req, res, next) => {
	if (req.isAuthenticated()) {
		const user = req.user;
		const isAdmin = await userIsAdmin(user);

		if (isAdmin) {
			next();
		} else {
			res.status(401).json({ error: "Not authenticated (Not Admin)" });
		}
	} else {
		res.status(401).json({ error: "Not authenticated" });
	}
};
