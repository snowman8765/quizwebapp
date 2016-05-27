var quizApp = angular.module("quizApp", [
  "ngRoute",
  "quizApp.Controllers",
  "quizApp.Services"
]);

quizApp.config(["$locationProvider", function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);
