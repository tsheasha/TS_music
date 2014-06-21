var q = require('q');

var UserModel = require('../models/User');
var ListenModel = require('../models/Listen');

exports.recommendation = function(username) {
    var deferred = q.defer();

	var rec = new recommend(username);

	rec.getRecommendation()
		.then(function(recs) {
			deferred.resolve(recs);
		});

	return deferred.promise;
};


function recommend(username) {

	var User = UserModel.Get(username);

	var recommendationLimit = 5;
    var ignoreList = [];

	this.getRecommendation = function() {
		return User
			.then(
				function(user) {
					return q.all(FolloweesSongs(user))
							.then(GenerateRanking)
							.then(GenerateRecommendations);

				});	
	};

	function GenerateRecommendations(rankings) {
		var deferred = q.defer();
		var recommendations = [];
        
        var highestRank = Object.keys(rankings)
                                  .sort()
                                  .reverse()[0];

		while (recommendations.length < recommendationLimit && highestRank > 0) {

			var songs = rankings[highestRank];

			if (songs.length > 0) {
				var recommendaitonsToGet = recommendationLimit - recommendations.length;
				var newRecommendations = songs.slice(0, recommendaitonsToGet);
				recommendations = recommendations.concat(newRecommendations);
			}
			highestRank--;
		}
        
        //In case recoomendaitons are less than 5, add random songs until
        //5 recommended songs are reached to increase song discovery
		if (recommendations.length  < recommendationLimit) {

            var allSongs = ListenModel.GetSongs();
            var toAdd = allSongs.filter(  
                function(song) { 
                    return this.ignoreList.indexOf(song) == -1 && recommendations.indexOf(song) == -1 
                }); 
			
            recommendations = recommendations.concat(toAdd);
            deferred.resolve(recommendations.slice(0, recommendationLimit));            
		} else {
			deferred.resolve(recommendations);
		}
		return deferred.promise;
	}
}

//Returns a mapping of rankings to songs to be able to sort
//songs with highest ranking to be at the beginning of the list.
function GenerateRanking(songRankings) {
	var deferred = q.defer();

	var rankToSongs = {};

	for (var key in songRankings) {
		var songRank = songRankings[key];

		if (rankToSongs[songRank]) {
			rankToSongs[songRank].push(key);
		} else {
			rankToSongs[songRank] = [key];
		}
	}

	deferred.resolve(rankToSongs);

	return deferred.promise;
}

//Get the list of music the user's followees listened to, excluding
//music the user themself listened to.
function FolloweesSongs(user) {
	this.ignoreList = user.listenedTo;
	var deferred = q.defer();
	
    GetFollowees(user)
		.then(GetMusic)
		.then(ExcludeListenedTo)
		.then(MusicRanking)
		.then(function(rank) {
                deferred.resolve(rank); 
            });


	function GetFollowees(user) {

		var followees = user.follows.map(function(name) {
			return UserModel.Get(name);
		});

		return q.all(followees);
	}

	function GetMusic(users) {
		var deferred = q.defer();
		var songs = [];
            
		for (var followee in users) { 
			
            var listens = users[followee].listenedTo;

			for (var listen in listens) {
				songs.push(listens[listen]);
			}
		}

		deferred.resolve(songs);

		return deferred.promise;
	}

    function ExcludeListenedTo(songs){
        return songs.filter(  
            function(song) { 
                return this.ignoreList.indexOf(song) == -1 
                });
    }


	function MusicRanking(songs) {
		var songDict = {};

		for (var song in songs) {

			if (songDict[songs[song]]) {
				songDict[songs[song]]++;
			} else {
				songDict[songs[song]] = 1;
			}
		}

		deferred.resolve(songDict);

		return deferred.promise;
	}

	return deferred.promise;
};
