'use strict';

var app = angular.module('frontend', ['ngResource']);

app.controller('FrontEnd', ['$scope', '$resource', function($scope, $resource) {
	$scope.count = 20;

	$scope.sendMessages = function() {
		console.log('Submitting ' + $scope.count + ' messages');
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
