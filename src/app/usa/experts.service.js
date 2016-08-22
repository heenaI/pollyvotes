(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('expertService', expertService);

  /** @ngInject */
  function expertService($http) {
      var url = 'https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&level=state&type=experts_combined&callback=JSON_CALLBACK';
       var items = {};
      items.getData = function(){
        return $http.jsonp(url);
      }
      return items

          }


})();
