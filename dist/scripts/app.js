(function() {
    function config($stateProvider, $locationProvider, lockProvider) {
        lockProvider.init({
            clientID: 'XvKP6086ia7dCyCRg7axioEQcxZrtoBn',
            domain: 'pnb3431.auth0.com'
        });    	

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
         	})
            .state('login', {
                url: '/login',
                controller: 'loginController as login',
                templateUrl: 'components/login/login.html'
            });
    	}
    angular
        .module('blocJams', ['auth0.lock', 'angular-jwt', 'ui.router'])
        .config(config);
})();
 