const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const { getRequests } = require("../db/helpers/requests");
const isAdmin = require("../middleware/isAdmin");

router.use(checkAuth);

router.get("/", async (req, res) => {
	req = await getRequests();
	res.json({ requests: req });
});

module.exports = router;
