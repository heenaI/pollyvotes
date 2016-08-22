(function() {
  'use strict';

  angular
      .module('pollyvotes')
      .service('mapService', mapService);

  /** @ngInject */
  function mapService($http) {
      var url = '//pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&level=state&callback=JSON_CALLBACK';
       var items = {};
      items.getData = function(){
        return $http.jsonp(url);
      }
      return items

          }


})();
