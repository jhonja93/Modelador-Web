var express      = require('express'),
	  app 			   = express();
	  config 			 = require('./config/config'),
    glob   			 = require('glob'),
    mongoose 		 = require('mongoose'),
    cookieParser = require('cookie-parser'),
    bodyParser 	 = require('body-parser'),
    session 		 = require('express-session'),
    fs 				   = require('fs'),
    logger			 = require('morgan'),
	  flash        = require('connect-flash'),
    passport     = require('passport');

mongoose.connect(config.db);
var db 				= mongoose.connection;

db.once('open', function () {
  console.info('connected to database')
});

//require('./passport/init')(passport); // pass passport for configuration
// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

// set up our express application
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})


db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

app.use(logger('dev')); // log every request to the console
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config/express')(app, config);


app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

