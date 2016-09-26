(function() {
    function CollectionCtrl($scope, Fixtures) {
    	this.albums = Fixtures.getCollection();

    	$scope.query = '';
        $scope.queryBy = '$';
    		
    }
 
    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['$scope','Fixtures', CollectionCtrl]);
})();