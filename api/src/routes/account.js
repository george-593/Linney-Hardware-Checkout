const expres = require("express");
const router = expres.Router();
const passport = require("passport");

const { getUser, createUser } = require("../db/helper");

router.get("/", (req, res) => {
	res.send("Hello World!");
});

router.get("/get/:username", async (req, res) => {
	const username = req.params.username;
	const user = await getUser(username);

	delete user.password;
	res.json({ exists: user });
});

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
module.exports = router;
