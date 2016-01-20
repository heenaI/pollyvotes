(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope) {
    var vm = this;

    $scope.photos = [   {id: 'photo-1', name: 'something here',src: "assets/images/300x600.png", href: "https://www.google.de/?gws_rd=ssl", discription: "say something about the chart here"},
                        {id: 'photo-2', name: 'another picture', src: "assets/images/300x600.png", href: "https://www.google.de/?gws_rd=ssl", discription: "say something about the chart here"},
                        {id: 'photo-3', name: 'another picture', src: "assets/images/300x600.png", href: "https://www.google.de/?gws_rd=ssl", discription: "say something about the chart here"},
                        {id: 'photo-4', name: 'another picture', src: "assets/images/300x600.png", href: "https://www.google.de/?gws_rd=ssl", discription: "say something about the chart here"}
                    ];
  }
})();
