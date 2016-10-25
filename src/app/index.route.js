(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('english', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController'
      })
      .state('german', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainDeController'
      })
      .state('line', {
        url: '/lineChart',
        templateUrl: 'app/simplerChart/simplerChart.html',
        controller: 'SimpleChartController'
      })
      .state('table', {
        url: '/historyTable',
        templateUrl: 'app/historyTable/historyTable.html'
      })
      .state('map', {
        url: '/usaMap',
        templateUrl: 'app/usa/simplemap.html'
      })
      .state('mainlinechrat', {
        url: '/pollygraph',
        templateUrl: 'app/lineChartAlloptions/lineChartalloptions.html',
        controller: 'linechartalloptionsController'
      })
      .state('testinglinechrat', {
        url: '/testpollygraph',
        templateUrl: 'app/lineChartAlloptions/testinglinechart.html',
        controller: 'linechartalloptionsController'
      });

$urlRouterProvider.otherwise('/');

  }

})();
