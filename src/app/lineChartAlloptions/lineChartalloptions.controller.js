(function() {
	'use strict';

	angular
		.module('pollyvotes')
		.controller('linechartalloptionsController', linechartalloptionsController);

	/** @ngInject */
	function linechartalloptionsController($scope, $timeout, lineChart, $translate, tmhDynamicLocale, $filter) {

		
		$scope.firstDate = new Date('04.01.2016')



  console.log($scope.clintonForcast)



	}

})();