// load all the things we need
var facebook    = require('./facebook');
var twitter     = require('./twitter');
var google      = require('./google');
var local       = require('./local');
// load up the user model
var User        = require('../app/models/user');

module.exports = function(passport){
// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        //console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            //console.log('deserializing user:',user);
            done(err, user);
        });
    });

    local(passport);
    facebook(passport);
    twitter(passport);
    google(passport);

}
