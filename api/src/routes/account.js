const express = require("express");
const router = express.Router();
const passport = require("passport");

const { getUser, createUser } = require("../db/helpers/user");

const checkAuth = require("../middleware/checkAuth");

router.get("/get/:username", async (req, res) => {
	const username = req.params.username;
	const user = await getUser(username);

	delete user.password;
	res.status(200).json(user);
});

router.get("/get", checkAuth, async (req, res) => {
	const username = req.user.username;
	const user = await getUser(username);

	delete user.password;
	res.status(200).json({ user });
});

router.post("/register", async (req, res) => {
	const { username, password } = req.body;
	const user = await createUser(username, password);

	delete user.password;
	if (user) {
		res.status(201).json({ user });
	} else {
		res.status(500).json({ error: "Error creating user" });
	}
});

router.post("/login", passport.authenticate("local"), (req, res) => {
	res.status(200).json({ user: req.user });
});

module.exports = router;
