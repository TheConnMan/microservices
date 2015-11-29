module.exports = {
	getAmpqConnection: function() {
		var d = Q.defer();
		amqp.connect('amqp://localhost', function(err, conn) {
			d.resolve(conn);
		});
		return d.promise;
	},
	getChannel: function(conn) {
		var d = Q.defer();
		conn.createChannel(function(err, ch) {
			d.resolve({
				channel: ch,
				connection: conn
			});
		});
		return d.promise;
	},
	submitMessage: function(channel, queue, message) {
		channel.assertQueue(queue, {durable: false});
		channel.sendToQueue(queue, new Buffer(message));
	}
};
