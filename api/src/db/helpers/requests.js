const { client } = require("../db");

// "SELECT requests.*, users.username AS user_username, inventory.name AS item_name FROM requests JOIN users ON requests.user_id = users.id JOIN inventory ON requests.item_id = inventory.id"
// "SELECT * FROM requests"
const getRequests = async () => {
	const data = await client.query(
		"SELECT requests.*, users.username AS user_username, inventory.name AS item_name FROM requests JOIN users ON requests.user_id = users.id JOIN inventory ON requests.item_id = inventory.id"
	);
	return data.rows;
};

const createRequest = async (user_id, item_id, quantity) => {
	const data = await client.query(
		"INSERT INTO requests (user_id, item_id, quantity) VALUES ($1, $2, $3) RETURNING *",
		[user_id, item_id, quantity]
	);
	return data.rows;
};

const deleteRequest = async (id) => {
	const data = await client.query("DELETE FROM requests WHERE id = $1", [id]);
	return data.rows;
};

const updateRequest = async (id, user_id, item_id, quantity) => {
	const data = await client.query(
		"UPDATE requests SET user_id = $1, item_id = $2, quantity = $3 WHERE id = $4 RETURNING *",
		[user_id, item_id, quantity, id]
	);
	return data.rows;
};

module.exports = {
	getRequests,
	createRequest,
	deleteRequest,
	updateRequest,
};
