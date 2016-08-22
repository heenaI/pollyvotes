(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('lineChart', lineChart);

  /** @ngInject */
  function lineChart($http) {
      var url = 'https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&displaydays=350&callback=JSON_CALLBACK';
      var dataService = {};
      dataService.getData = function(){
        return $http.jsonp(url, { cache: true});
      }
      return dataService
          }


})();
