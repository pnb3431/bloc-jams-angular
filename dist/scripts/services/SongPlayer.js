(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};

        /**
 		* @desc stores the album information
 		* @type {Object}
 		*/
        var currentAlbum = Fixtures.getAlbum();
        
        /**
 		* @desc Buzz object audio file
 		* @type {Object}
 		*/
        var currentBuzzObject = null;
        /**
 		*	 @function setSong
 		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
 		* @param {Object} song
 		*/
        var setSong = function(song) {
    		if (currentBuzzObject) {
        		currentBuzzObject.stop();
        		SongPlayer.currentSong.playing = null;
    		}
 
    		currentBuzzObject = new buzz.sound(song.audioUrl, {
        		formats: ['mp3'],
        		preload: true
    		});

    		currentBuzzObject.bind('timeupdate', function() {
         		$rootScope.$apply(function() {
             		SongPlayer.currentTime = currentBuzzObject.getTime();
         		});
     		});
 
 
    		SongPlayer.currentSong = song;
 		};

 		/* *
              * @function playSong
              * @desc Plays passed in song object
              * @param {Object} song
        */

 		var playSong = function(song) {
 			song = song || SongPlayer.currentSong;
    		currentBuzzObject.play()
    		song.playing = true;
    		
    		
    	};

    	/* *
              * @function plays next song after completing current song
              * @desc moves to next passed in song object
              * @param {Object} song
        */

    	var autoPlay = function(song) {
    		currentBuzzObject.bind("ended", function(){
    			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     				currentSongIndex++;

     			if (currentSongIndex >= currentAlbum.songs.length) {
         			stopSong(SongPlayer.currentSong);
     			}else {
         			var song = currentAlbum.songs[currentSongIndex];
         			setSong(song);
         			playSong(song);
     		}
    		});
    		
    	};

    	/* *
              * @function stopsSong
              * @desc stops passed in song object
              * @param {Object} song
        */

 		var stopSong = function(song) {
 			song = song || SongPlayer.currentSong;
    		currentBuzzObject.stop();
    		song.playing = null;
    	};
    	
    	/* *
              * @function getSongIdex
              * @desc gets the index of the song
              * @param {Object} song
        */

    	var getSongIndex = function(song) {
     		return currentAlbum.songs.indexOf(song);
 		};

		/**
			* @desc Active song object from list of songs
			* @type {Object}
		*/
    	SongPlayer.currentSong = null;

    	/**
 		* @desc Current playback time (in seconds) of currently playing song
 		* @type {Number}
 		*/
 		SongPlayer.currentTime = null;
    	
    	/* *
             * @function SongPlayer.play
             * @desc Method to start playing song
             * @param {Object} song
        */


        SongPlayer.play = function(song) {
        	song = song || SongPlayer.currentSong;
        	if (song == null) return;
        	if (SongPlayer.currentSong !== song) {	
				setSong(song);
        		playSong(song);
        		autoPlay(song);
        	} else if (SongPlayer.currentSong === song) {
        		if (currentBuzzObject.isPaused()) {
        			playSong(song);
        			autoPlay(song);
          		}
        	}
        	
        	
        };
        	
        SongPlayer.pause = function(song) {
        	song = song || SongPlayer.currentSong;
     		currentBuzzObject.pause();
     		song.playing = false;
 		};

 		/* *
             * @function SongPlayer.previous
             * @desc Method to start playing previous song
             * @param {Object} song
        */
 		SongPlayer.previous = function() {
     		var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     		currentSongIndex--;

     		if (currentSongIndex < 0) {
         		stopSong(SongPlayer.currentSong);
     		}else {
         		var song = currentAlbum.songs[currentSongIndex];
         		setSong(song);
         		playSong(song);
     		}
 		};

 		/* *
             * @function SongPlayer.next
             * @desc Method to start playing next song
             * @param {Object} song
        */
 		SongPlayer.next = function() {
     		var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     		currentSongIndex++;

     		if (currentSongIndex >= currentAlbum.songs.length) {
         		stopSong(SongPlayer.currentSong);
     		}else {
         		var song = currentAlbum.songs[currentSongIndex];
         		setSong(song);
         		playSong(song);
     		}
 		};

 		/**
 		* @function setCurrentTime
 		* @desc Set current time (in seconds) of currently playing song
 		* @param {Number} time
 		*/
 		SongPlayer.setCurrentTime = function(time) {
     		if (currentBuzzObject) {
         		currentBuzzObject.setTime(time);
     		}
 		};

 		/**
        * @function setVolume
        * @desc Set songs volume
        * @param {Number} volume
        */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };

        SongPlayer.mute = function() {
            SongPlayer.setVolume(0);
        };



    
        return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();