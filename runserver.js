var express = require('express');
var fs = require('fs');
var	bodyParser = require('body-parser');

// Controllers
var followController = require('./controllers/FollowController');
var listenController = require('./controllers/ListenController');
var recommendationController = require('./controllers/RecommendationController');


var app = express();
var env = process.env.NODE_ENV || 'development';

// all environments
app.set('port', process.env.PORT || 3000);
app.use(bodyParser());


// App Endpoints
app.post('/follow', followController.follow);
app.post('/listen', listenController.listen);
app.get('/recommendations', recommendationController.recommend);

app.listen(app.get('port'), function() {
	console.log("Server listening on port %d", app.get('port'));
});

module.exports = app;
