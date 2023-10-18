const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const { getInventory } = require("../db/helper");

router.use(checkAuth);

router.get("/", (req, res) => {
	res.json({ message: "Hello World!" });
});

router.get("/get", async (req, res) => {
	inv = await getInventory();
	res.json({ inventory: inv });
});

module.exports = router;
