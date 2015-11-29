'use strict';

var app = angular.module('frontend', ['ngResource']);

app.controller('FrontEnd', ['$scope', '$http', '$resource', function($scope, $http, $resource) {
	$scope.count = 20;
	$scope.loading = false;
	$scope.uuid = localStorage.getItem('uuid') ? localStorage.getItem('uuid') : guid();
	localStorage.setItem('uuid', $scope.uuid);

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
