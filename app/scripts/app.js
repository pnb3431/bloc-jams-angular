(function() {
    function config($stateProvider, $locationProvider) {
    	$locationProvider
         	.html5Mode({
             	enabled: true,
             	requireBase: false
        });
        $stateProvider
         	.state('landing', {
             	url: '/',
             	controller: 'LandingCtrl as landing',
             	templateUrl: '/templates/landing.html'
        	})
         	.state('album', {
             	url: '/album',
             	controller: 'AlbumCtrl as album',
             	templateUrl: '/templates/album.html'
         	})
         	.state('collection', {
             	url: '/collection',
             	controller: 'CollectionCtrl as collection',
             	templateUrl: '/templates/collection.html'
         	});
    	}
    angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// passport/login.js
passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' :  username }, 
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false, 
                req.flash('message', 'User Not found.'));                 
        }
        // User exists but wrong password, log the error 
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false, 
              req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
      }
    );
}));
var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

 