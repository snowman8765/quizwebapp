var quizApp = angular.module('QuizApp', ['ngRoute']);

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
