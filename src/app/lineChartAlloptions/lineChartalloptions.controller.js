(function() {
	'use strict';

	angular
		.module('pollyvotes')
		.controller('linechartalloptionsController', linechartalloptionsController);

	/** @ngInject */
	function linechartalloptionsController($scope, $timeout, lineChart, $translate, tmhDynamicLocale, $filter) {
 
		$timeout(function() {
			console.log($scope.desarTrumpForecast)
		}, 10000);



	}

})();