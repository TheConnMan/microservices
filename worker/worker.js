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
			ch.consume(q, function(msg) {
				console.log(" [x] Received %s", msg.content.toString());
			}, {
				noAck: true
			});
		});
	});
}
