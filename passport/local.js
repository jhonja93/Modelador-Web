var LocalStrategy       = require('passport-local').Strategy;
var User                = require('../app/models/user'),
    soap                = require('soap'),
    url                 = 'http://ws.espol.edu.ec/saac/wsandroid.asmx?WSDL';

// expose this function to our app using module.exports
module.exports = function(passport) {
 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        var args = {authUser: email, authContrasenia: password};
        var resp;
        console.log("autenticacion");
        soap.createClient(url, function(err, client) {
            client.autenticacion(args, function(err, result){
                resp = result.autenticacionResult;
                console.log(resp);
                if (resp) {
                    // find a user whose email is the same as the forms email
                    // we are checking to see if the user trying to login already exists

                    User.findOne({ 'local.username' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);
                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That user already exists.'));
                    } else {
                        var args = {usuario: email}
                        console.log("Voy a consultar datos del usuario " + email);
                        var newUser = new User();
                        soap.createClient(url, function(err, client) {
                            client.wsInfoUsuario(args, function(err, result){
                                console.log(result.wsInfoUsuarioResult.diffgram.NewDataSet.INFORMACIONUSUARIO);
                                var json = result.wsInfoUsuarioResult.diffgram.NewDataSet.INFORMACIONUSUARIO;

                                newUser._id     = json.IDENTIFICACION;
                                newUser.names   = json.NOMBRES +" "+ json.APELLIDOS;
                                newUser.local.username            = email;
                                newUser.local.email         = email+"@espol.edu.ec";
                                newUser.local.password      = newUser.generateHash(password); // use the generateHash function in our user model
                                newUser.local.nombres       = json.NOMBRES;
                                newUser.local.apellidos     = json.APELLIDOS;
                                newUser.local.matricula     = json.IDENTIFICACION;


                                // save the user
                                newUser.save(function(err) {
                                    if (err)
                                       throw err;
                                    console.log("Guardo el usuario " + newUser.local.nombres);
                                    return done(null, newUser);
                                });

                                //response.json(result.wsInfoUsuarioResult.diffgram.NewDataSet.INFORMACIONUSUARIO);
                            });
                        });
                    }

                    });

                }else{
                console.log('Usuario o contraseña incorrecta, intente nuevamente');
                return done(null, false, req.flash('signupMessage', 'User or password incorrect'));
            }
            });
       });
    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
       User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            console.log (user);
            return done(null, user);
        });

    }));
};

