(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('ecosubcomponent', ecosubcomponent);

  /** @ngInject */
  function ecosubcomponent($http) {
      var url = 'https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&type=econ_models&displaydays=350&callback=JSON_CALLBACK';
      var dataService = {};
      dataService.getData = function(){
        return $http.jsonp(url, { cache: true});
      }
      return dataService
          }


})();
