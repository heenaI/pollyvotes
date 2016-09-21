(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('pollagg', pollagg);

  /** @ngInject */
  function pollagg($http) {
      var url = 'https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&type=polls_combined&displaydays=350&displaydays=350&callback=JSON_CALLBACK';
      var dataService = {};
      dataService.getData = function(){
        return $http.jsonp(url, { cache: true});
      }
      return dataService
          }


})();
