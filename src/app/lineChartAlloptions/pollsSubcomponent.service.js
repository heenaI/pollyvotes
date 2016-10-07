(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('pollssubcomponent', pollssubcomponent);

  /** @ngInject */
  function pollssubcomponent($http) {
      var url = 'https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&type=polls&displaydays=350&callback=JSON_CALLBACK';
      var dataService = {};
      dataService.getData = function(){
        return $http.jsonp(url, { cache: true});
      }
      return dataService
          }


})();
