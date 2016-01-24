var express   = require('express'),
    router    = express.Router(),
    login = require('./LoginController'),
    diagrams = require('./DiagramController');

module.exports = function (app) {
  app.use('/', router);
  app.use('/login', login);
  app.use('/diagrams', diagrams);

};
