const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const {
	getInventory,
	getInventoryItem,
	addInventory,
	deleteInventory,
	updateInventory,
} = require("../db/helpers/inventory");
const isAdmin = require("../middleware/isAdmin");

router.use(checkAuth);

router.get("/", async (req, res) => {
	inv = await getInventory();
	res.json(inv);
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const inv = await getInventoryItem(id);

	if (inv.length === 0) {
		res.status(404).json({ error: "No inventory with that ID" });
		return;
	}
	res.json(inv[0]);
});

router.post("/", isAdmin, async (req, res) => {
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

router.patch("/update/:id", isAdmin, async (req, res) => {
	const { id } = req.params;
	var { name, description, quantity } = req.body;

	if (!name && !description && !quantity) {
		res.status(400).json({ error: "No fields to update" });
		return;
	}

	if (!name || !description || !quantity) {
		old = await getInventoryItem(id);

		if (!name) {
			name = old[0].name;
		}
		if (!description) {
			description = old[0].description;
		}
		if (!quantity) {
			quantity = old[0].quantity;
		}
	}

	const inv = await updateInventory(id, name, description, quantity);
	res.json({ inventory: inv });
});

module.exports = router;
