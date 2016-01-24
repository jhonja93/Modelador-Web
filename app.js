var express         = require('express'),
    app             = express();
    config          = require('./config/config'),
    glob            = require('glob'),
    mongoose        = require('mongoose'),
    cookieParser    = require('cookie-parser'),
    favicon         = require('serve-favicon'),
    bodyParser      = require('body-parser'),
    session         = require('express-session'),
    fs              = require('fs'),
    logger          = require('morgan'),
    flash           = require('connect-flash'),
    passport        = require('passport'),
    compress        = require('compression');
    methodOverride  = require('method-override');


var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.set('views', config.root + '/app/views');
app.set('view engine', 'ejs');

mongoose.connect(config.db);
var db = mongoose.connection;

db.once('open', function () {
  console.info('connected to database')
});

app.set('views', config.root + '/app/views');
app.set('view engine', 'ejs');

// app.use(favicon(config.root + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(compress());
app.use(express.static(config.root + '/public'));
app.use(methodOverride());

app.use(session({ secret: 'ilovescotchscotchyscotchscotch',
                  resave: true,
                  saveUninitialized: false})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//require('./passport/init')(passport); // pass passport for configuration
// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var controllers = glob.sync(config.root + '/app/controllers/*.js');
controllers.forEach(function (controller) {
  require(controller)(app);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

// set up our express application
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

app.use(function (req, res, next) {
  var err = new Error('No encontrado');
  err.status = 404;
  next(err);
});

if(app.get('env') === 'development'){
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
});

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
