const { client } = require("../db");

const getInventory = async () => {
	const data = await client.query("SELECT * FROM inventory");
	return data.rows;
};

const addInventory = async (name, description, quantity) => {
	const data = await client.query(
		"INSERT INTO inventory (name, description, quantity) VALUES ($1, $2, $3) RETURNING *",
		[name, description, quantity]
	);
	console.log(data.rows);
	return data.rows;
};

const deleteInventory = async (id) => {
	const data = await client.query(
		"DELETE FROM inventory WHERE id = $1 RETURNING *",
		[id]
	);
	return data.rows;
};

const updateInventory = async (id, name, description, quantity) => {
	const data = await client.query(
		"UPDATE inventory SET name = $1, description = $2, quantity = $3 WHERE id = $4 RETURNING *",
		[name, description, quantity, id]
	);
	return data.rows;
};

module.exports = {
	getInventory,
	addInventory,
	deleteInventory,
	updateInventory,
};
