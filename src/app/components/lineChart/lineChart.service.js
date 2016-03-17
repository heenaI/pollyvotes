(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('lineChart', lineChart);

  /** @ngInject */
  function lineChart($http) {
      var url = 'http://polly.haim.it/wp-content/plugins/pollyvote/data/index.php?time=current&callback=JSON_CALLBACK';
      var dataService = {};
      dataService.getData = function(){
        return $http.jsonp(url);
      }
      return dataService

          }


})();
