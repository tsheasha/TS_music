var assert = require('assert');
var express = require('express');
var request = require('request');
var async = require('async');
var path = require('path');
var fs = require('fs');

// Launch server
var server = require('../runserver.js');

// Global Settings
var userQueryString = 'a';
var baseURI = 'http://localhost:3000/';

var options = { method: ''
  , uri: baseURI
  , headers: {'Content-Type': 'application/json'}
  , json: {}
};

/**
 * SendRequest
 * Helper Function/Iterator for async.each
 * 
 */
function SendRequest(item, callback){
	// Attach JSON
	options.json=item;

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

describe('Music Recommender System', function() {
  describe('Listen', function() {
    it('Executes the listen command with the provided JSON', function(done){
		
        // Setup Options JSON for the requests to be sent
		options.uri = baseURI+'listen';
		options.method = 'POST';

		// Read data from jsonFile
		var listenJSON;
		var fileContent = fs.readFileSync('./test/data/listen.json');
		
        listenJSON = JSON.parse(fileContent);

		// Build array of requests to be sent to server, and store in array
		var listenRequests =[];
		for (var key in listenJSON.userIds){
			for (var i = 0; i<listenJSON.userIds[key].length; i++){
				listenRequests.push({user:key, song:listenJSON.userIds[key][i]});

			}
		}
		
        async.each(listenRequests, SendRequest, done);

	});

  });
  
  describe('Follow', function() {
    it('Executes the follow command with the provided JSON', function(done){
		// Setup Options JSON for the requests to be sent
		options.uri = baseURI+'follow';
		options.method = 'POST';

		// Read data from jsonFile
		var followsJSON;
		var fileContent = fs.readFileSync('./test/data/follows.json');
		
        followsJSON = JSON.parse(fileContent);

		// Build array of requests to be sent to server, and store in array
		var followsRequests =[];
		for (var i = 0; i<followsJSON.operations.length; i++){
			followsRequests.push({from:followsJSON.operations[i][0], to:followsJSON.operations[i][1]});
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
		SendRequest(null, function(err){done()});
	});
  });
});
