(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('expert', expert);

  /** @ngInject */
  function expert($http) {
      var url = 'https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&type=experts_combined&displaydays=350&callback=JSON_CALLBACK';
      var dataService = {};
      dataService.getData = function(){
        return $http.jsonp(url, { cache: true});
      }
      return dataService
          }


})();
