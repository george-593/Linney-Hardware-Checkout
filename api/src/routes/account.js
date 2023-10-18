const expres = require("express");
const router = expres.Router();
const passport = require("passport");

const { userExists, createUser } = require("../db/helper");

router.get("/", (req, res) => {
	res.send("Hello World!");
});

router.get("/exists/:username", async (req, res) => {
	const username = req.params.email;
	const exists = await userExists(username);

	res.json({ exists });
});

/*
router.post(
	"/signup",
	passport.authenticate("local-signup"),
	(req, res, next) => {
		res.json({ user: req.user });
	}
);
*/

router.post("/signup", async (req, res) => {
	const { username, password } = req.body;
	const user = await createUser(username, password);

	delete user.password;
	if (user) {
		res.json({ user });
	} else {
		res.json({ error: "Error creating user" });
	}
});

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/api/v1/account/login/success",
		failureRedirect: "/api/v1/account/login/failure",
	})
);

router.get("/login/success", (req, res) => {
	res.json({ user: req.user });
});

router.get("/login/failure", (req, res) => {
	res.json({ error: "Error logging in" });
});

router.get("/authtest", passport.authenticate("session"), (req, res) => {
	res.json({ user: req.session });
});

module.exports = router;
