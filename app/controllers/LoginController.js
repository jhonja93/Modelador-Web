var express = require('express');
var router = express.Router();
var stringController = require('./str/strController');
var User  = mongoose.model('User');

module.exports = function (app) {

  app.get('/', isLoggedIn, function(req, res) {

      res.render('user.ejs', {
        nameUser : req.user.local.nombres + " " + req.user.local.apellidos, // get the user out of session and pass to template
        photoUser : "https://www.academico.espol.edu.ec/imgEstudiante/" + req.user.local.matricula + ".jpg",
      });
    });

  app.get('/index', function(req, res, ne) {
      // render the page and pass in any flash data if it exists
      res.render('index.ejs', { message: req.flash('loginMessage'), title: 'DRAW-ER' });

  });

  // process the login form
  // app.post('/auth/', passport.authenticate('local-login', {
  //   successRedirect : '/user/local', // redirect to the secure profile section
  //   failureRedirect : '/index', // redirect back to the signup page if there is an error
  //   failureFlash : true // allow flash messages
  // }));

  app.post('/auth/login', function(req, res, next) {
      console.log("req.body::::> " + req.body.user + req.body.password);
      passport.authenticate('local-login', function(err, user, info) {
        if (err) return next(err);
        if (!user){
          //console.log("Se esta redireccionando");
          return res.json({message: req.flash('loginMessage')});
          //return res.redirect('/index');//res.send({message: req.flash('loginMessage')});
        }
        req.logIn (user, function(err) {
          if (err) return next(err);
          var nombre = user.local.nombres;
          var apellido = user.local.apellidos;
          nombre = nombre.substring(0, nombre.indexOf(" "));
          apellido = apellido.substring(0, apellido.indexOf(" "));
          var username = (nombre.concat(apellido)).toLowerCase();
          return res.json({user: username});
          //res.redirect('/user/local/' + username);
        });
      })(req, res, next);
    });


  app.get('/signup', function(req, res) {
      // render the page and pass in any flash data if it exists
      res.render('index.ejs', { message: req.flash('signupMessage') , title: "DRAW-ER"});
  });

  app.post('/auth/signup', function(req, res, next) {
  //console.log("req.body::::> " + req.body.user +" "+req.body.password);
  passport.authenticate('local-signup', function(err, user, info) {
    if (!user) {
      console.log("NO ES USUARIO DE ESPOL");
      return res.json({message: req.flash('signupMessage')});
    }
    req.logIn (user, function(err) {
      if (err) return next(err);
      var nombre = user.local.nombres;
      var apellido = user.local.apellidos;
      nombre = nombre.substring(0, nombre.indexOf(" "));
      apellido = apellido.substring(0, apellido.indexOf(" "));
      var username = (nombre.concat(apellido)).toLowerCase();
      username = stringController.removeDiacritics(username);
      return res.json({user: username});
      //res.redirect('/user/local/' + username);
    });
  })(req, res, next);
});


  app.get('/user/local/*', isLoggedIn, function(req, res, next) {
    req.session.Userid =req.user._id;
    res.render('user.ejs', {
      nameUser : req.user.local.nombres + " " + req.user.local.apellidos, // get the user out of session and pass to template
      photoUser : "https://www.academico.espol.edu.ec/imgEstudiante/" + req.user.local.matricula + ".jpg"
    });
  });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    });

    app.get('/user/facebook', isLoggedIn, function(req, res, next) {
      req.session.Userid =req.user._id;
      console.log(req.user._id);
      res.render('user.ejs', {
        id : req.user._id,
        nameUser : req.user.facebook.name + " " + req.user.facebook.lastName, // get the user out of session and pass to template
        photoUser : req.user.facebook.picture
      });
    });

  // route for facebook authentication and login
    // different scopes while logging in
    app.get('/auth/facebook',
      passport.authenticate('facebook', { scope : ['email'] }
    ));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect : '/user/facebook',
        failureRedirect : '/'
      })
    );

    // route for twitter authentication and login
    // different scopes while logging in
    app.get('/auth/twitter',
      passport.authenticate('twitter'));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/twitter/callback',
      passport.authenticate('twitter', {
        successRedirect : '/user/twitter',
        failureRedirect : '/'
      })
    );

    /* GET Twitter View Page */
    app.get('/user/twitter', isLoggedIn, function(req, res){
      req.session.Userid =req.user._id;
      console.log(req.user._id);
      res.render('user.ejs', {
        nameUser: req.user.twitter.displayName,
        photoUser : req.user.twitter.picture
      });
    });

    app.get('/auth/google',
      passport.authenticate('google', { scope: ['email', 'profile'] }));


    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/user/google',
        failureRedirect: '/'
      })
    );

    app.get('/user/google', isLoggedIn, function(req, res){
      req.session.Userid =req.user._id;
        res.render('user.ejs', {
          nameUser: req.user.google.name,
          photoUser : req.user.google.picture
        });
    });

    app.get('/draw', isLoggedIn, function(req, res) {
      res.render('draw.ejs',{

      })
    });


};

// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()){
    next();
  }
  else
    res.redirect('/index');// if they aren't redirect them to the home page

}
