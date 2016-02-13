var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var User = require('../app/models/user');
var configAuth = require('../config/auth');

module.exports = function(passport) {

	    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ '_id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            user._id             = profile.id;
                            user.names           = profile.displayName;
                            user.picture         = profile._json['picture'];

                            user.google.id       = profile.id;
                            user.google.token 	= token;
                            user.google.name  	= profile.displayName;
                            user.google.email 	= profile.emails[0].value; // pull the first email
                            user.google.picture = profile._json['picture'];

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        var newUser             = new User();

                        newUser._id             = profile.id;
                        newUser.names           = profile.displayName;
                        newUser.picture         = profile._json['picture'];

                        newUser.google.id       = profile.id;
                        newUser.google.token    = token;
                        newUser.google.name     = profile.displayName;
                        newUser.google.email    = profile.emails[0].value; // pull the first email
                        newUser.google.picture  = profile._json['picture'];

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user               = req.user; // pull the user out of the session
                user._id            = profile.id;
                user.names          = profile.displayName;
                user.picture        = profile._json['picture'];

                user.google.id    	= profile.id;
                user.google.token 	= token;
                user.google.name  	= profile.displayName;
                user.google.email 	= profile.emails[0].value; // pull the first email
                user.google.picture	= profile._json['picture'];

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }

        });

    }));

};
