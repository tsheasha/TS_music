var request = require('request');
var async = require('async');
var fs = require('fs');
var assert = require('assert');

// Launch server
var server = require('../runserver.js');

// Global Settings
var userQueryString = 'a';
var baseURI = 'http://localhost:3000/';

var options = { method: '', 
                uri: '',
                headers: {'Content-Type': 'application/json'},
                parameters: {}};

/**
 * SendRequest
 * Helper Function/Iterator for async.each
 * 
 */
function SendRequest(item, callback){
	// Attach JSON
	options.parameters=item;

	request(options, function(err, response, body){
		HandleResponse(err, response, body);
		callback(err);
	});
}

/**
 * HandleResponse
 * Helper Function for requests
 * 
 */
function HandleResponse(err, res, body){
	if (!err){
		console.log(res.statusCode);
		console.log(body);
	} else {
		console.log("NO RESPONSE");
	}
}

function FileToJSON(filename){
    return JSON.parse(fs.readFileSync(filename));
}

describe('Music Recommender System', function() {
  describe('POST /listen', function() {
    it('Passes JSON to listen endpoint', function(done){
		
        // Setup Options JSON for the requests to be sent
		options.uri = baseURI+'listen';
		options.method = 'POST';

		// Read data from jsonFile
		var listenJSON = FileToJSON('./test/data/listen.json');
		
		// Build array of requests to be sent to server, and store in array
		var listenRequests =[];
		for (var key in listenJSON.userIds){
			for (var i = 0; i < listenJSON.userIds[key].length; i++){
				listenRequests.push({
                    
                    user: key, 
                    song: listenJSON.userIds[key][i]
                
                });
			}
		}
		
        async.each(listenRequests, SendRequest, done);

	});

  });
  
  describe('POST / follow', function() {
    it('Passes JSON to follow endpoint', function(done){
		// Setup Options JSON for the requests to be sent
		options.uri = baseURI+'follow';
		options.method = 'POST';

		// Read data from jsonFile
		var followsJSON = FileToJSON('./test/data/follows.json');

		// Build array of requests to be sent to server, and store in array
		var followsRequests =[];
		for (var i = 0; i < followsJSON.operations.length; i++){
			followsRequests.push({
                
                follower: followsJSON.operations[i][0], 
                followee: followsJSON.operations[i][1]
                
            });
		}
        async.each(followsRequests, SendRequest, done);
	});
  });
  
  describe('Recommendations', function() {
    it('Returns song recommendations for the given username', function(done){
		
        // Setup Options JSON for the requests to be sent
		options.uri = baseURI+'recommendations?user='+userQueryString;
		options.method = 'GET';

		// Execute request
        request.get({url: options.uri, json: true}, function (err, resp, body) {
          response = resp;
          assert.equal(200, response.statusCode);
          assert.equal(5, body.list.length);          
          done(err);
        });
        
	});
  });
});
