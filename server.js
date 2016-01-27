var path = require('path');

var express = require('express');

var app = express();

app.disable('x-powered-by');

// Serve up static assets from ./dist
app.use(express.static('dist'));

// Serve up index.html for all other requests and let React handle routing
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'source', 'templates', 'index.html'));
});

// Start server on :1337
var server = app.listen(1337, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Server running at http://%s:%s', host, port);
});
