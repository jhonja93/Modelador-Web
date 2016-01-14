var express   = require('express'),
    router    = express.Router(),
    mongoose  = require('mongoose'),
    User      = mongoose.model('User'),
    swig      = require('swig');

module.exports = function (app) {
  app.use('/', router);


  // app.get('/', function (req, res, next) {
  //   User.find(function (err, users) {
  //     if (err) {
  //       console.log(err);
  //       return next(err);
  //     };
  //     res.render('index', { title: 'DRAW-ER', users: users});
  //   });
  // });

app.get('/', function(req, res) {
    res.render('index.ejs', { message: req.flash(''), title: 'DRAW-ER' }); // load the index.ejs file
    //res.render('index', {title: 'DRAW-ER'});
  });



app.get('/index', function(req, res, ne) {
    // render the page and pass in any flash data if it exists
    res.render('index.ejs', { message: req.flash('loginMessage'), title: 'DRAW-ER' });
    
});

// process the login form
app.post('/index', passport.authenticate('local-login', {
  successRedirect : '/user', // redirect to the secure profile section
  failureRedirect : '/index', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));


app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});

  // process the signup form
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/user', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
app.engine('html', swig.renderFile);
// swig.renderFile('./app/views/user.html', {
//     nameUser : req.user.local.nombres
// });

app.get('/user', isLoggedIn, function(req, res, next) {
  res.render('user.html', {
    nameUser : req.user.local.nombres + " " + req.user.local.apellidos // get the user out of session and pass to template
  });
});

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()){
    next();
  }
  else
    res.redirect('/');// if they aren't redirect them to the home page
  
}