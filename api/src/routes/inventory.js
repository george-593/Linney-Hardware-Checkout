const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const { getInventory, addInventory, deleteInventory } = require("../db/helper");
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

router.delete("/delete/:id", isAdmin, async (req, res) => {
	const { id } = req.params;
	const inv = await deleteInventory(id);

	if (inv.length === 0) {
		res.status(404).json({ error: "No inventory with that ID" });
		return;
	}
	res.json({ inventory: inv });
});

router.put("/update/:id", isAdmin, async (req, res) => {
	const { id } = req.params;
	const { name, description, quantity } = req.body;
	const inv = await updateInventory(id, name, description, quantity);
	res.json({ inventory: inv });
});

module.exports = router;
