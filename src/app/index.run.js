(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
