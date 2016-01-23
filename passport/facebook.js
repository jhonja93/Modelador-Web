var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../app/models/user');
// load the auth variables
var configAuth = require('../config/auth');

module.exports = function(passport) {

    passport.use('facebook', new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields   : ["id", "birthday", "email", "first_name", "gender", "last_name"]
    },

    // facebook will send back the tokens and profile
    function(req, token, refreshToken, profile, done) {

		// asynchronous
		process.nextTick(function() {
			if (!req.user){
				// find the user in the database based on their facebook id
		        User.findOne({ 'id' : profile.id }, function(err, user) {

		            if (err)
		                return done(err);

					// if the user is found, then log them in
		            if (user) {
		            	if(!user.facebook.token){
		            		user.facebook.token 	= token;
		            		user.facebook.name 		= profile.name.givenName;
		            		user.facebook.lastName 	= profile.name.familyName;
		            		user.facebook.picture 	= 'http://graph.facebook.com/' + profile.id + '/picture';
		            		user.facebook.email 	= profile.emails[0].value;

		            		user.save(function(err){
		            			if(err)
		            				throw err;
		            			return done(null, user);
		            		});
		            	}

		            	return done(null, user);

		            } else {
		                // if there is no user found with that facebook id, create them
		                var newUser = new User();

						// set all of the facebook information in our user model
		                newUser.facebook.id    		= profile.id; // set the users facebook id
		                newUser.facebook.token 		= token; // we will save the token that facebook provides to the user
		                newUser.facebook.name  		= profile.name.givenName;
		                newUser.facebook.lastName 	= profile.name.familyName; // look at the passport user profile to see how names are returned
		                newUser.facebook.picture 	= 'http://graph.facebook.com/' + profile.id + '/picture';
		                newUser.facebook.email 		= profile.emails[0].value; // facebook can return multiple emails so we'll take the first

						// save our user to the database
		                newUser.save(function(err) {
		                    if (err)
		                        throw err;

		                    // if successful, return the new user
		                    return done(null, newUser);
		                });
		            }

		        });
			}else{
				// user already exists and is logged in, we have to link accounts
                var user            		= req.user; // pull the user out of the session

                user.facebook.id    		= profile.id;
                user.facebook.token 		= token;
                user.facebook.name  		= profile.name.givenName;
                user.facebook.lastName 		= profile.name.familyName;
                newUser.facebook.picture 	= 'http://graph.facebook.com/' + profile.id + '/picture';
                user.facebook.email 		= profile.emails[0].value;

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
			}
        });

    }));

};
