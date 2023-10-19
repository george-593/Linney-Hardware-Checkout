const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const { getInventory, addInventory } = require("../db/helper");
const isAdmin = require("../middleware/isAdmin");

router.use(checkAuth);

router.get("/", async (req, res) => {
	inv = await getInventory();
	res.json({ inventory: inv });
});

router.post("/add", isAdmin, async (req, res) => {
	const { name, description, quantity } = req.body;
	const inv = await addInventory(name, description, quantity);
	res.json({ inventory: inv });
});

module.exports = router;
