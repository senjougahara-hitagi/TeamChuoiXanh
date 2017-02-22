var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(User) {
    passport.serializeUser( function( user, cb ) {
        //nothing to do here as we use the username as it is
        cb( null, user );
    } );

    passport.deserializeUser( function( obj, cb ) {
        //again, we just pass the username forward
        cb( null, obj );
    } );

    passport.use(new FacebookStrategy({
      clientID: '1190346094375499',
      clientSecret: '182fe23321b3155e98adabb5091d13a0',
      callbackURL: 'http://local.techkids.com:7000/api/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOneOrCreate(
        { username: profile.id},
        { username: profile.id, facebookId: profile.id },
        function (err, user) {
          return cb(err, user);
      });
    }
  ));
}
