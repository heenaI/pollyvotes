(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('citizen', citizen);

  /** @ngInject */
  function citizen($http) {
      var url = 'https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&type=expectations_combined&displaydays=350&callback=JSON_CALLBACK';
      var dataService = {};
      dataService.getData = function(){
        return $http.jsonp(url, { cache: true});
      }
      return dataService
          }


})();
