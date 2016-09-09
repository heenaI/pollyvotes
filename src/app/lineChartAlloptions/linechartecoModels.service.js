(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('econometricModels', econometricModels);

  /** @ngInject */
  function econometricModels($http) {
      var url = 'https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&type=econ_models_combined&displaydays=350&callback=JSON_CALLBACK';
      var dataService = {};
      dataService.getData = function(){
        return $http.jsonp(url, { cache: true});
      }
      return dataService
          }


})();
