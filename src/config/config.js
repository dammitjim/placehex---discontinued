var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'placehex'
    },
    port: 3000,
    db: 'mongodb://localhost/placehex-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'placehex'
    },
    port: 3000,
    db: 'mongodb://localhost/placehex-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'placehex'
    },
    port: 3000,
    db: 'mongodb://localhost/placehex-production'
  }
};

module.exports = config[env];
