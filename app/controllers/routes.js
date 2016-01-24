var express   = require('express'),
    router    = express.Router(),
    User      = mongoose.model('User'),
    Diagram   = mongoose.model('Diagram'),
    swig      = require('swig');

module.exports = function (app) {
  app.use('/', router);

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
  app.post('/auth/local', passport.authenticate('local-login', {
    successRedirect : '/user/local', // redirect to the secure profile section
    failureRedirect : '/index', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));


  app.get('/signup', function(req, res) {
      // render the page and pass in any flash data if it exists
      res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

    // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/user/local', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  app.get('/user/local', isLoggedIn, function(req, res, next) {
    req.session.Userid =req.user._id;
    res.render('user.ejs', {
      nameUser : req.user.local.nombres + " " + req.user.local.apellidos, // get the user out of session and pass to template
      photoUser : "https://www.academico.espol.edu.ec/imgEstudiante/" + req.user.local.matricula + ".jpg"
    });
  });

  app.post('/save',function(req,res){
    // res.send(req.body.svg);


    // console.log(req.session.Userid);
    User.find({_id : req.session.Userid},function (err, user) {
      if (err) return handleError(err);
      console.log(user._id+" ;)");
      var newDiagram = new Diagram();
      newDiagram.local.jdiagram= req.body.svg;
      newDiagram.local.name = req.body.dname;
      newDiagram.local.owner = req.session.Userid;
      user[0].draws.push(newDiagram);
      user[0].save(function(err){
          if (err) throw err;
           res.send("guardado exitoso");
        });
      // res.send("guardado exitoso");
      console.log(JSON.stringify(user, null, "\t"));
});
  app.post('/share',function(req,res){

  });

    // console.log(currentUser._id);
    //current


    /*newDiagram.save(function(err){
      if (err) throw err;
      res.send("guardado exitoso");
    });*/


  })

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
      req.session.Userid =req.user_id;
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
        userId : req.session.Userid
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
