const bcrypt = require("bcryptjs");

const client = require("./db");
const logger = require("../utils/Logger");

const userExists = async (username) => {
	const data = await client.query("SELECT * FROM users WHERE username = $1", [
		username,
	]);

	return data.rows.length > 0;
};

const getUser = async (username) => {
	const data = await client.query("SELECT * FROM users WHERE username = $1", [
		username,
	]);

	if (data.rows.length > 0) {
		return data.rows[0];
	} else {
		return false;
	}
};

const createUser = async (username, password) => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	exists = await userExists(username);
	if (exists) {
		return false;
	}

	const data = await client.query(
		"INSERT INTO users (username, isAdmin, password) VALUES ($1, $2, $3) RETURNING *",
		[username, false, hash]
	);

	if (data.rows.length > 0) {
		logger.info(`Created user ${username}`);
		return data.rows[0];
	} else {
		return false;
	}
};

const matchPassword = async (username, password) => {
	const data = await client.query("SELECT * FROM users WHERE username = $1", [
		username,
	]);

	if (data.rows.length > 0) {
		const user = data.rows[0];
		const match = await bcrypt.compare(password, user.password);
		return match;
	} else {
		return false;
	}
};

module.exports = {
	userExists,
	createUser,
	matchPassword,
	getUser,
};
