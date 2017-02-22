'use strict';

var passport = require('passport');
var config = require('./config');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../user/user.model');

var validateJwt = expressJwt({
  secret: config.secret
});

module.exports = {
  /**
   * Attaches the user object to the request if authenticated
   * Otherwise returns 403
   */
  isAuthenticated : function() {
    return compose()
      // Validate jwt
      .use(function(req, res, next) {
        // allow access_token to be passed through query parameter as well
        if (req.cookies.token) {
          // if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.cookies.token
          // }
        }
        validateJwt(req, res, next);
      })
      // Attach user to request
      .use(function(req, res, next) {
        User.findById(req.user._id).exec()
          .then(user => {
            if (!user) {
              return res.status(401).end();
            }
            req.user = user;
            next();
          })
          .catch(err => next(err));
      });
  },

  /**
   * Checks if the user role meets the minimum requirements of the route
   */
  hasRole: function(roleRequired) {
    if (!roleRequired) {
      throw new Error('Required role needs to be set');
    }

    return compose()
      .use(this.isAuthenticated())
      .use(function(req, res, next) {
        if (config.userRoles.indexOf(req.user.role) >=
            config.userRoles.indexOf(roleRequired)) {
          next();
        } else {
          res.status(403).send('Forbidden');
        }
      });
  },

  /**
   * Returns a jwt token signed by the app secret
   */
  signToken: function(id, role) {
    return jwt.sign({ _id: id, role: role }, config.secret, {
      expiresIn: 60 * 30
    });
  },

  /**
   * Set token cookie directly for oAuth strategies
   */
  setTokenCookie: function(req, res) {
    if (!req.user) {
      return res.status(404).send('It looks like you aren\'t logged in, please try again.');
    }
    var token = signToken(req.user._id, req.user.role);
    res.cookie('token', token);
    res.redirect('/');
  }
}
