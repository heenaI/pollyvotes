(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('lineChartIndexModel', lineChartIndexModel);

  /** @ngInject */
  function lineChartIndexModel($http) {
      var url = 'https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&displaydays=350&type=index_models_combined&callback=JSON_CALLBACK';
      var dataService = {};
      dataService.getData = function(){
        return $http.jsonp(url, { cache: true});
      }
      return dataService
          }


})();
