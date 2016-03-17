(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('line', {
        url: '/lineChart',
        templateUrl: 'app/simplerChart/simplerChart.html',
        controller: 'SimpleChartController'
      })
      .state('table', {
        url: '/historyTable',
        templateUrl: 'app/historyTable/historyTable.html'
      });

$urlRouterProvider.otherwise('/');

  }

})();
