(function() {
    function LandingCtrl() {
    	this.heroTitle = "Turn the Music Up!";
    	this.searchBox = "Testing";
    }
 
    angular
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
})();