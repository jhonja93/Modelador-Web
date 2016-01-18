var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'drawer'
    },
    port: 3000,
    db: 'mongodb://localhost/drawerdev'
  },

  test: {
    root: rootPath,
    app: {
      name: 'drawer'
    },
    port: 3000,
    db: 'mongodb://localhost/drawer-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'drawer'
    },
    port: 3000,
    db: 'mongodb://localhost/drawer-production'
  }
};

module.exports = config[env];
