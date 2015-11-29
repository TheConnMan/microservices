var express = require('express');
var Q = require('q');

var rabbitmq = require('./server/rabbitmq');

var app = express();

app.use(express.static('public'));

app.get('/submit', function(req, res) {
	Q.fcall(rabbitmq.getAmpqConnection)
	.then(rabbitmq.getChannel)
	.then(function(connObj) {
		for (var i = 0; i < req.query.count; i++) {
			rabbitmq.submitMessage(connObj.channel, 'test', 'Hello world');
		}
		res.send(JSON.stringify({ok: true}));
	});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
