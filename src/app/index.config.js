(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
