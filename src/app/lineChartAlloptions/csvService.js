(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .service('csvService', csvService);

  /** @ngInject */
  function csvService($http) {
    var csv = 'app/lineChartAlloptions/Pollyvote_Linechart_with_dropdown.csv';
    var dataService = {};
    dataService.getData = function() {
     

      return Papa.parse($http.get(csv), {
        delimiter: "",
        header: true,
        dynamicTyping: true
      })
    }
    return dataService
  }


})();