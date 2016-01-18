var GoogleStrategy = require('passport-google-openidconnect').Strategy;
var User = require('../app/models/user');
var configAuth = require('../config/auth');

module.exports = function(passport) {

	passport.use(new GoogleStrategy({
		clientID		: '595370832278-tshto7qapj4anouh8ffcuitl65fceq39.apps.googleusercontent.com',
		clienteSecret	: 'XULKBIHglpwMED5z_Rkpl_Cd',
		callbackURL		: 'http://127.0.0.1:3000/auth/google/callback'
	},
	function(iss, sub, profile, accessToken, refreshToken, done) {
		// asynchronous
		process.nextTick(function() {

			// find the user in the database based on their facebook id
	        User.findOne({ 'id' : profile.id }, function(err, user) {

	        	// if there is an error, stop everything and return that
	        	// ie an error connecting to the database
	            if (err)
	                return done(err);

				// if the user is found, then log them in
	            if (user) {
	                return done(null, user); // user found, return that user
	            } else {
	                // if there is no user found with that facebook id, create them
	                var newUser = new User();

					// set all of the facebook information in our user model
	                newUser.google.id    	= profile.id; // set the users facebook id	                
	                newUser.google.token 	= token; // we will save the token that facebook provides to the user	                
	                newUser.google.email  	= profile.email;
	                newUser.google.name 	= profile.displayName; // look at the passport user profile to see how names are returned
	                newUser.google.picture 	= profile.img.url;

					// save our user to the database
	                newUser.save(function(err) {
	                    if (err)
	                        throw err;

	                    // if successful, return the new user
	                    return done(null, newUser);
	                });
	            }

	        });
        });
	}
	))}

