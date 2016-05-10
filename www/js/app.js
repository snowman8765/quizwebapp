var quizApp = angular.module('QuizApp', ['ionic','ngRoute']);

quizApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

quizApp.controller('HtmlCtrl', function($scope) {
    this.basePath = window.location.pathname;
});

quizApp.controller('MainCtrl', ['$route', '$routeParams', '$location',
  function($route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
}])
.controller('MainPageCtrl', ['$scope', '$location', function() {/* 一覧用 */}])
.controller('UserPageCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.save = function() {};
  $scope.login = function() {};
  $scope.logout = function() {};
}])
.controller('QuizPageCtrl', function() {/* 詳細用 */})
;
