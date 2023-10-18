const logger = require("../utils/Logger");

function LoggerMW(req, res, next) {
	logger.info(
		`Received a ${req.method} request for ${req.url} from ${req.ip}`
	);
	next();
}

module.exports = LoggerMW;
