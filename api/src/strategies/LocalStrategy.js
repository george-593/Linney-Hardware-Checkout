const LocalStrategy = require("passport-local");
const passport = require("passport");
const {
	userExists,
	createUser,
	matchPassword,
	getUser,
} = require("../db/helper");

passport.serializeUser(function (user, cb) {
	console.log("serializing user: ", user);
	cb(null, user);
});

passport.deserializeUser(function (user, cb) {
	console.log("deserializing user: ", user);
	getUser(user.username).then((user) => cb(null, user));
});

module.exports = () => {
	passport.use(
		new LocalStrategy(function verify(username, password, cb) {
			userExists(username)
				.then((exists) => {
					if (exists) {
						console.log("User exists");
						matchPassword(username, password)
							.then((match) => {
								if (match) {
									console.log("pw match");
									cb(null, { username });
								} else {
									console.log("pw no match");
									cb(null, false);
								}
							})
							.catch((err) => cb(err));
					} else {
						console.log("User doesn't exist");
						createUser(username, password)
							.then((user) => cb(null, user))
							.catch((err) => cb(err));
					}
				})
				.catch((err) => cb(err));
		})
	);
};
