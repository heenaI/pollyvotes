(function() {
	'use strict';

	angular
		.module('pollyvotes')
		.directive('resizer', resizer);

	/** @ngInject */
	function resizer($window) {
		return {
			restrict: 'A',
			link: function($scope, elem, attrs) {
				angular.element($window).on('resize', function() {
					$scope.$apply(function() {
						$scope.isLarge = $window.innerWidth < 992 ? true : false;
					})
				});
			}
		}
	}
})();