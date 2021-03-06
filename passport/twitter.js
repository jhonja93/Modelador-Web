var TwitterStrategy  = require('passport-twitter').Strategy;
var User = require('../app/models/user');
var configAuth = require('../config/auth.js');

module.exports = function(passport) {

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, tokenSecret, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ '_id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.twitter.token) {
                            username._id                 = profile.id;
                            user.names               = profile.displayName;
                            user.picture             = profile.photos[0].value;

                            user.twitter.id          = profile.id;
                            user.twitter.token       = token;
                            user.twitter.username    = profile.username;
                            user.twitter.displayName = profile.displayName;
                            user.twitter.picture     = profile.photos[0].value;
                            user.twitter.lastStatus  = profile._json.status.text;

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser                 = new User();
                        newUser._id                 = profile.id;
                        newUser.names               = profile.displayName;
                        newUser.picture             = profile.photos[0].value;

                        newUser.twitter.id          = profile.id;
                        newUser.twitter.token       = token;
                        newUser.twitter.username    = profile.username;
                        newUser.twitter.displayName = profile.displayName;
                        newUser.twitter.picture     = profile.photos[0].value;
                        newUser.twitter.lastStatus  = profile._json.status.text;

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user                  = req.user; // pull the user out of the session
                user._id                  = profile.id;
                user.names                = profile.displayName;
                user.picture              = profile.photos[0].value;

                user.twitter.id           = profile.id;
                user.twitter.token        = token;
                user.twitter.username     = profile.username;
                user.twitter.displayName  = profile.displayName;
                user.twitter.picture      = profile.photos[0].value;
                user.twitter.lastStatus   = profile._json.status.text;

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }

        });

    }));

};
