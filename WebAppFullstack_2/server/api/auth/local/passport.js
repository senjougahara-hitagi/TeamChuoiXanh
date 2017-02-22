var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function localAuthenticate(User, username, password, done) {
  User.findOne({
    username: username.toLowerCase()
  }).exec(function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, {message: 'This account is not registered.'}); }
      if (!user.authenticate(password)) { return done(null, false, { message: 'This password is not correct.' }); }
      return done(null, user);
    })
}

module.exports = function(User) {
  passport.use(new LocalStrategy(function(username, password, done) {
    return localAuthenticate(User, username, password, done);
  }));
}
