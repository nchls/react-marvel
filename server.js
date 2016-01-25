var path = require('path');

var express = require('express');

var app = express();

app.disable('x-powered-by');

app.use(express.static('dist'));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'source', 'templates', 'index.html'));
});

var server = app.listen(1337, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Server running at http://%s:%s', host, port);
});
