const { client } = require("../db");

// "SELECT requests.*, users.username AS user_username, inventory.name AS item_name FROM requests JOIN users ON requests.user_id = users.id JOIN inventory ON requests.item_id = inventory.id"
// "SELECT * FROM requests"
const getRequests = async () => {
	const data = await client.query(
		"SELECT requests.*, users.username AS user_username, inventory.name AS item_name FROM requests JOIN users ON requests.userId = users.id JOIN inventory ON requests.itemId = inventory.id"
	);
	return data.rows;
};

const getRequest = async (id) => {
	const data = await client.query(
		"SELECT requests.*, users.username AS user_username, inventory.name AS item_name FROM requests JOIN users ON requests.userId = users.id JOIN inventory ON requests.itemId = inventory.id WHERE requests.id = $1",
		[id]
	);
	return data.rows;
};

const createRequest = async (userId, itemId, quantity, isComplete) => {
	const data = await client.query(
		"INSERT INTO requests (userId, itemId, quantity, isComplete) VALUES ($1, $2, $3, $4) RETURNING *",
		[userId, itemId, quantity, isComplete]
	);
	return data.rows;
};

const deleteRequest = async (id) => {
	const data = await client.query("DELETE FROM requests WHERE id = $1", [id]);
	return data.rows;
};

const updateRequest = async (id, user_id, item_id, quantity) => {};

module.exports = {
	getRequests,
	getRequest,
	createRequest,
	deleteRequest,
	updateRequest,
};
