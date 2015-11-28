'use strict';

var app = angular.module('frontend', ['ngResource']);

app.controller('FrontEnd', ['$scope', '$http', '$resource', function($scope, $http, $resource) {
	$scope.count = 20;
	$scope.loading = false;

	$scope.sendMessages = function() {
		$scope.loading = true;
		$http.get('/submit?count=' + $scope.count)
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
