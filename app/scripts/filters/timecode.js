(function() {
    function timecode() {
        return function(seconds) {
        	var seconds = Number.parseFloat(seconds);

        	if (Number.isNaN(seconds)) {
         		return '-:--';
     		}
     		
            var wholeSeconds = Math.floor(seconds);
            var timer = buzz.toTimer(wholeSeconds);
 
            
 
            return timer;
        };
    }
 
    angular
        .module('blocJams')
        .filter('timecode', timecode);
 })();