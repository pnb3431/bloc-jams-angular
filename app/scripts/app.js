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
            .state('login', {
                url: '/login',
                controller: 'LoginCtrl as login',
                templateUrl: '/templates/login.html'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: '/templates/profile.html'
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
document.getElementById('btn-login').addEventListener('click', function() {
  lock.show();
});
// Initiating our Auth0Lock
var lock = new Auth0Lock(
  'XvKP6086ia7dCyCRg7axioEQcxZrtoBn',
  'pnb3431.auth0.com'
);

// Listening for the authenticated event
lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getProfile() and save it to localStorage
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});
// Verify that there's a token in localStorage
var token = localStorage.getItem('idToken');
if (token) {
  showLoggedIn();
}

// Display the user's profile
function showLoggedIn() {
  var profile = JSON.parse(localStorage.getItem('profile'));
  document.getElementById('nick').textContent = profile.nickname;
}
 