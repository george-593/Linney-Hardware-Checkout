const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const winston = require("winston");

// Config
const apiRoot = "/api/v1";
const port = process.env.PORT || 5000;

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Logging

const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf(
			(info) => `${info.timestamp} ${info.level}: ${info.message}`
		)
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "logs/info.log" }),
	],
});

app.use((req, res, next) => {
	// Log an info message for each incoming request
	logger.info(`Received a ${req.method} request for ${req.url}`);
	next();
});

// DB

// Routes
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Hello World!");
});
