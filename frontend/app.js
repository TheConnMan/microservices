var express = require('express');
var Q = require('q');
var amqp = require('amqplib/callback_api');

var rabbitmq = require('./server/rabbitmq');

var app = express();

app.use(express.static('public'));

app.get('/submit', function(req, res) {
	console.log('Submitting ' + req.query.count + ' messages');
	Q.fcall(rabbitmq.getAmpqConnection)
	.then(rabbitmq.getChannel)
	.then(function(connObj) {
		for (var i = 0; i < req.query.count; i++) {
			rabbitmq.submitMessage(connObj.channel, 'Test', 'Hello world');
		}
		connObj.connection.close();
		res.send(JSON.stringify({ok: true}));
	});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
