(function() {
    function ProfileCtrl(auth) {
    	this.profileData = auth.profile;
    		
    }
 
    angular
        .module('blocJams')
        .controller('ProfileCtrl', ProfileCtrl);
})();