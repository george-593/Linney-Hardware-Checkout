const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const logger = require("./utils/Logger");
const package = require("../package.json");

const helper = require("./db/helpers/user");
const { sessionStore } = require("./db/db");
//const LocalStrategy = require("./strategies/LocalStrategy");

const loggerMW = require("./middleware/LoggerMW");

const accountRoutes = require("./routes/account");
const inventoryRoutes = require("./routes/inventory");

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
		saveUninitialized: true,
		store: sessionStore,
	})
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new LocalStrategy(async (user, password, done) => {
		logger.info(`Logging in user ${user}`);
		// Check the user exists
		exists = await helper.getUser(user);
		if (!exists) {
			logger.info(`User ${user} does not exist`);
			return done(null, false);
		}

		// Check the password matches
		match = await helper.matchPassword(user, password);
		if (!match) {
			logger.info(`Password for user ${user} does not match`);
			return done(null, false);
		}

		// Return the user
		delete user.password;
		logger.info(`User ${user} logged in`);
		return done(null, user);
	})
);

passport.serializeUser((user, done) => {
	logger.info(`Serializing user ${user}`);
	done(null, user);
});

passport.deserializeUser((user, done) => {
	logger.info(`Deserializing user ${user}`);
	done(null, user);
});

// Routes
const router = express.Router();
router.use("/account", accountRoutes);
router.use("/inventory", inventoryRoutes);

router.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use(apiRoot, router);

app.listen(port, () => {
	logger.info(
		`${package.name} v${package.version} listening on port ${port}`
	);
});
