var express = require('express');

var app = express();

app.use(express.static('public'));

app.get('/submit', function(req, res) {
	console.log('Submitting ' + req.query.count + ' messages');
	res.send(JSON.stringify({ok: true}));
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
