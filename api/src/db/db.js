require("dotenv").config();

const { Client } = require("pg");

const genFunc = require("connect-pg-simple");
const session = require("express-session");

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

const pgSession = genFunc(session);
const sessionStore = new pgSession({
	conString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
	createTableIfMissing: true,
});

module.exports = { client, sessionStore };
