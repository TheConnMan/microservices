var request = require('request');
var os = require("os");
var amqp = require('amqplib/callback_api');

connect();

function connect() {
	amqp.connect('amqp://rabbitmq', function(err, conn) {
		if (err) {
			console.log('Could not connect to rabbitmq, trying again...');
			setTimeout(connect, 1000);
			return null;
		}
		conn.createChannel(function(err, ch) {
			var q = 'test';
			ch.assertQueue(q, {durable: false});
			console.log("Waiting for messages in %s...", q);
			var hostname = os.hostname();
			ch.consume(q, function(msg) {
				var object = JSON.parse(msg.content.toString());
				request.post('http://rest-server:8080/message', {
					json: {
						host: hostname,
						message: object.message,
						clientId: object.uuid
					}
				});
			}, {
				noAck: true
			});
		});
	});
}
