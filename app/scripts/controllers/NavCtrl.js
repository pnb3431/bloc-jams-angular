(function() {
    function NavCtrl(Fixtures) {
    	this.searchBox = "Testing";
    	this.albums = Fixtures.getCollection(12);
    }
 
    angular
        .module('blocJams')
        .controller('NavCtrl', ['Fixtures', NavCtrl]);
})();