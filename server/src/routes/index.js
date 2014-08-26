'use strict';

// RESTful API Handlers
var handlers = {
    index: require('../controllers/index')
};

// RESTful API Handlers
module.exports = function (app) {
    // Index RESTful
    app.get('/', handlers.index.index);

    // TODO (martin): this should be moved to auth.js. We still need to figure out how we gonna load all routes at once
    var seedData = require('../config/seedData');
    // Add Authentication routes
    var _currentToken;


  function generateRandom() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  function guid() {
    return generateRandom() + generateRandom() + '-' + generateRandom() + '-' + generateRandom() + '-' +
      generateRandom() + '-' + generateRandom() + generateRandom() + generateRandom();
  }

    app.post('/auth.json', function (req, res) {

        var body = req.body,
            username = body.username,
            password = body.password;

        if (username === 'ember' && password === 'casts') {
            // Generate and save the token (forgotten upon server restart).
            _currentToken = guid();
            res.send({
                success: true,
                token: _currentToken
            });
        } else {
            res.send({
                success: false,
                message: 'Invalid username/password'
            });
        }
    });

    function validTokenProvided(req, res) {

        // Check POST, GET, and headers for supplied token.
        var userToken = req.body.token || req.param('token') || req.headers.token;

        if (!_currentToken || userToken !== _currentToken) {
            res.send(401, { error: 'Invalid token. You provided: ' + userToken });
            return false;
        }

        return true;
    }

    app.get('/articles.json', function (req, res) {
        if (validTokenProvided(req, res)) {
            res.send(seedData.ARTICLES);
        }
    });

    app.get('/booking.json', function (req, res) {
        if (validTokenProvided(req, res)) {
            res.send(seedData.ARTICLES);
        }
    });

    // Returns URL to pic of the day.
    app.get('/photos.json', function (req, res) {
        if (validTokenProvided(req, res)) {
            res.send(seedData.PHOTOS);
        }
    });
};