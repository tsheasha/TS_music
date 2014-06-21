var ListenDB = require('../volatileDB/listen');
var q = require('q');

//Handle creating a new listen event
exports.Create = function(listen) {
	var deferred = q.defer();

	try {
		var listen = ListenDB.Insert(listen);

		deferred.resolve(listen);
	} catch (err) {
		deferred.reject();
	}

	return deferred.promise;
}

//Get listens of a certain user given their username
exports.GetByUser = function(username) {
	var deferred = q.defer();

	try {
		var listens = ListenDB.Get();
		listens = listens.filter(function(listen) {
			return listen.user == username;
		});

		deferred.resolve(listens);
	} catch (err) {
		deferred.reject();
	}

	return deferred.promise;
}

//Get all songs from Listen items
exports.GetSongs = function(){
	var deferred = q.defer();
    
    var allSongs = ListenDB.Get();

    
    allSongs = allSongs.map(function(row) {
        return row.song;
    });
	
    return allSongs;
}
