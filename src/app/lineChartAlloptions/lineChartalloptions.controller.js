(function() {
	'use strict';

	angular
		.module('pollyvotes')
		.controller('linechartalloptionsController', linechartalloptionsController);

	/** @ngInject */
	function linechartalloptionsController($scope, $timeout, lineChart, $translate, tmhDynamicLocale, $filter) {

		$scope.allOnclickFunctions = function() {
        if ($scope.pollyVote == true) {
          $scope.addpollyVote()
        }

        if ($scope.indexModel == true) {
          $scope.indexOnclick()

        }
        if ($scope.models == true) {
          $scope.econoOnclick()
        }
        if ($scope.expert == true) {
          $scope.expertOnclick()
        }
        if ($scope.keysWhiteHouse == true) {
          $scope.keysOnclick()
        }
        if ($scope.issuesAndLeaders == true) {
          $scope.issuesOnclick()
        }
        if ($scope.bioIndex == true) {
          $scope.bioIndexOnclick()
        }
        if ($scope.bigIssue == true) {
          $scope.bigIssueOnclick()
        }
        if ($scope.issueIndex == true) {
          $scope.issueIndexOnclick()
        }
        if ($scope.citizen == true) {
          $scope.citizenOnclick()
        }
        if ($scope.markets == true) {
          $scope.pmOnclick()
        }
        if ($scope.aggregators == true) {
          $scope.intenpollsOnclick()
        }
        if ($scope.tpmPolls == true) {
          $scope.tpmOnclick()
        }
        if ($scope.huffingstonPolls == true) {
          $scope.huffingstonPollsOnclick()
        }
        if ($scope.electionProjection == true) {
          $scope.electionProjectionOnclick()
        }
        if ($scope.pluspolls == true) {
          $scope.pluspollsOnclick()
        }
        if ($scope.twoSeventytoWin == true) {
          $scope.twoSeventytoWinOnclick()
        }
        if ($scope.Real == true) {
          $scope.RealOnclick()
        }
        if ($scope.pec == true) {
          $scope.pecOnclick()
        }
        if ($scope.ex == true) {
          $scope.esubcomOnclick()
        }
        if ($scope.subcomponent == true) {
          $scope.esubcom()

        }
        if ($scope.Quinnipiac == true) {
          $scope.QuinnipiacOnclick()
        }
        if ($scope.economist == true) {
          $scope.economistOnclick()
        }
        if ($scope.usaToday == true) {
          $scope.usaTodayOnclick()
        }
        if ($scope.iem == true) {
          $scope.iemOnclick()
        }
        if ($scope.vox == true) {
          $scope.voxOnclick()
        }
        if ($scope.tfc == true) {
          $scope.tfcOnclick()
        }
        if ($scope.primary == true) {
          $scope.primaryOnclick()
        }
        if ($scope.lockerbie == true) {
          $scope.lockerbieOnclick()
        }
        if ($scope.desar == true) {
          $scope.desarOnclick()
        }
        if ($scope.tien == true) {
          $scope.tienOnclick()
        }
        if ($scope.indicators == true) {
          $scope.indicatorsOnclick()
        }
        if ($scope.jerome == true) {
          $scope.jeromeOnclick()
        }
        if ($scope.heat == true) {
          $scope.heatOnclick()
        }
        if($scope.fair){
          $scope.fairOnclick()

        }
        if($scope.electoralcycle){
          $scope.electoralcycleOnclick()
        }
        if($scope.desart){
          $scope.desartOnclick()
        }
        if($scope.bump){
          $scope.bumpOnclick()
        }
        if($scope.pollsPlus){
          $scope.pollsPlusOnclick()
        }
        if($scope.fiscalModel){
          $scope.fiscalModelOnclick()
        }
        if($scope.holbrook){
          $scope.holbrookOnclick()
        }
      };

 
		$timeout(function() {
			console.log($scope.desarTrumpForecast)
		}, 10000);



	}

})();