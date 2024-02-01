const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const {
	getRequests,
	getRequest,
	createRequest,
	updateRequest,
	deleteRequest,
} = require("../db/helpers/requests");
const isAdmin = require("../middleware/isAdmin");

router.use(checkAuth);

router.get("/", async (req, res) => {
	data = await getRequests();
	res.json(data);
});

router.get("/:id", async (req, res) => {
	data = await getRequest(req.params.id);
	res.json(data);
});

router.post("/", async (req, res) => {
	if (!req.body.item_id || !req.body.quantity) {
		res.status(400).json({ error: "Missing required fields" });
		return;
	}

	req = await createRequest(
		req.user.id,
		req.body.item_id,
		req.body.quantity,
		false
	);
	res.json(req);
});

router.patch("/:id", isAdmin, async (req, res) => {
	const { id } = req.params;
	const { user_id, item_id, quantity, status } = req.body;

	if (!user_id && !item_id && !quantity && !status) {
		res.status(400).json({ error: "No fields to update" });
		return;
	}

	if (!user_id || !item_id || !quantity || !status) {
		old = await getRequest(id);

		if (!user_id) user_id = old.user_id;
		if (!item_id) item_id = old.item_id;
		if (!quantity) quantity = old.quantity;
		if (!status) status = old.status;
	}

	data = await updateRequest(id, user_id, item_id, quantity, status);
	res.json(data);
});

router.delete("/:id", isAdmin, async (req, res) => {
	data = await deleteRequest(req.params.id);
	res.json(data);
});

module.exports = router;
