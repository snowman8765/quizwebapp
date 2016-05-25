var ctrls = angular.module('quizApp.Controllers', []);

ctrls.controller('TopCtrl', ['$scope', "FaviconService",
  function($scope, FaviconService) {
    //console.log("TopCtrl:");
    FaviconService.badge(3);
  }
]);
