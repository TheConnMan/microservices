'use strict';

var app = angular.module('frontend', ['ngResource']);

app.controller('FrontEnd', ['$scope', '$http', '$resource', function($scope, $http, $resource) {
	$scope.fields = [{
		field: 'id',
		name: 'ID'
	}, {
		field: 'message',
		name: 'Text'
	}, {
		field: 'clientId',
		name: 'Client UUID'
	}, {
		field: 'host',
		name: 'Worker ID'
	}, {
		field: 'dateCreated',
		name: 'Date Created'
	}];
	$scope.sortField = 'dateCreated';
	$scope.reverse = false;

	$scope.count = 20;
	$scope.loading = false;
	$scope.uuid = localStorage.getItem('uuid') ? localStorage.getItem('uuid') : guid();
	localStorage.setItem('uuid', $scope.uuid);

	var Message = $resource('http://rest-server:8080/message/:id', {id: '@id'}, {
		update: {
			method: 'PUT',
			params: {id: '@id'}
		}
	});

	$scope.messages = Message.query({uuid: $scope.uuid});

	setInterval(function() {
		var maxId = Math.max.apply(Math, $scope.messages.map(function(m) { return m.id; }).concat([0]));
		Message.query({uuid: $scope.uuid, maxId: maxId}, function(data) {
			$scope.messages = $scope.messages.concat(data.map(identity));
		});
	}, 1000);

	$scope.sendMessages = function() {
		$scope.loading = true;
		$http.get('/submit?count=' + $scope.count + '&uuid=' + $scope.uuid)
		.then(function() {
			$scope.loading = false;
		})
		.catch(function() {
			$scope.error = true;
		});
	};

	$scope.changeSort = function(field) {
		if ($scope.sortField == field) {
			$scope.reverse = !$scope.reverse;
		} else {
			$scope.sortField = field;
			$scope.reverse = false;
		}
	};

	$scope.formatDate = function(dateString) {
		return new Date(dateString).toString('MM/dd/yyyy HH:mm:ss');
	};
}]).directive('frontendEnter', function() {
	return function($scope, $element, $attrs) {
		$element.bind('keydown keypress', function(e) {
			if (e.which === 13) {
				$scope.$apply(function() {
					$scope.$eval($attrs.frontendEnter);
				});
				e.preventDefault();
			}
		});
	};
});

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function identity(d) {
	return d;
}
