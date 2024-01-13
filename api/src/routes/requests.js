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
	res.json({ req });
});

module.exports = router;
