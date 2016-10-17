(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('pmsubcomponent', pmsubcomponent);

  /** @ngInject */
  function pmsubcomponent($http) {
      var url = 'https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&type=markets&displaydays=350&callback=JSON_CALLBACK';
      var dataService = {};
      dataService.getData = function(){
        return $http.jsonp(url, { cache: true});
      }
      return dataService
          }


})();
