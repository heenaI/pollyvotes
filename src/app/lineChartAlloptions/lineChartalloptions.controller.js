(function() {
	'use strict';

	angular
		.module('pollyvotes')
		.controller('linechartalloptionsController', linechartalloptionsController);

	/** @ngInject */
	function linechartalloptionsController($scope, $timeout, lineChart, $translate, tmhDynamicLocale, $window) {

		// $timeout(function() {
		// 	if ($window.innerWidth <= 399) {

		// 		$scope.chart.yAxis[0].setTitle({
		// 			text: ''
		// 		});
		// 	}
		// }, 1000);



	}

})();