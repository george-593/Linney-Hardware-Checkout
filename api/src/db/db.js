require("dotenv").config();

const { Client } = require("pg");
const logger = require("../utils/Logger");

const client = new Client({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

client.connect().catch((err) => {
	if (err.code === "ECONNREFUSED") {
		logger.error("Database connection refused");
	}
});

module.exports = client;
