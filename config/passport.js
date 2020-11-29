const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.secretOrKey,
};

const main = passport => {
	passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
		
		try {
			const user = await User.findById(jwt_payload.userId);
			if (user) {
				return done(null, user);
			}

			return done(null, false);
		} catch (err) {
			console.log(err);
		}
	}));
}

module.exports = main;