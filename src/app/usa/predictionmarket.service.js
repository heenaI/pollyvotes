(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('predictionService', predictionService);

  /** @ngInject */
  function predictionService($http) {
      var url = 'https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&level=state&type=markets_combined&callback=JSON_CALLBACK';
       var items = {};
      items.getData = function(){
        return $http.jsonp(url);
      }
      return items

          }


})();
