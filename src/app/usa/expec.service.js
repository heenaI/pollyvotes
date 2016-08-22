(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('expecService', expecService);

  /** @ngInject */
  function expecService($http) {
      var url = 'https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&level=state&type=expectations_combined&callback=JSON_CALLBACK';
       var items = {};
      items.getData = function(){
        return $http.jsonp(url);
      }
      return items

          }


})();
