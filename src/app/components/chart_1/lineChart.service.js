(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .service('lineChartService', lineChart);

    /** @ngInject */
    function lineChart($scope, $http){
      var promise = null;
      return function(){
        if (promise){
          return promise
        } else {
          promise = $http.jsonp('http://polly.haim.it/wp-content/plugins/pollyvote/data/index.php?time=current')
          .success(function(data){
            $scope.predictions = data;
         })
          .error( function(data){
            $scope.data = "Request failed";
          })

          return promise;
        }

      }


    }


  })
