(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('modelService', modelService);

  /** @ngInject */
  function modelService($http) {
      var url = 'https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&level=state&type=econ_models_combined&callback=JSON_CALLBACK';
       var items = {};
      items.getData = function(){
        return $http.jsonp(url);
      }
      return items

          }


})();
