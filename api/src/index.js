const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");

const logger = require("./utils/Logger");
const package = require("../package.json");

const LocalStrategy = require("./strategies/LocalStrategy");

const loggerMW = require("./middleware/LoggerMW");

const accountRoutes = require("./routes/account");

// Config
const apiRoot = "/api/v1";
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(loggerMW);
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
		cookie: { secure: true },
	})
);

// Passport

app.use(passport.initialize());
app.use(passport.session());
LocalStrategy();
// Routes
const router = express.Router();
router.use("/account", accountRoutes);

router.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use(apiRoot, router);

app.listen(port, () => {
	logger.info(
		`${package.name} v${package.version} listening on port ${port}`
	);
});
