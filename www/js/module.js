angular.module('quizApp', ['ngRoute','quizApp.controllers'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
  
  .when('/', {
    templateUrl: '/v/index',
    controller: 'TopCtrl'
  })
  
  .when('/index', {
    templateUrl: '/v/index',
    controller: 'TopCtrl'
  })
  
  .when('/main', {
    templateUrl: '/v/main',
    controller: 'TopCtrl'
  })
  
  .when('/about', {
    templateUrl: '/v/about'
  })
  
  .when('/info', {
    templateUrl: '/v/info',
    controller: 'TopCtrl'
  })
  
  .when('/quiz', {
    templateUrl: '/v/quiz',
    controller: 'TopCtrl'
  })
  
  .when('/users', {
    redirectTo: '/v/users/home'
  })
  
  .when('/users/home', {
    templateUrl: '/v/users/home',
    controller: 'TopCtrl'
  })
  
  .when('/users/login', {
    templateUrl: '/v/users/login',
    controller: 'TopCtrl'
  })
  
  .when('/users/logout', {
    templateUrl: '/v/users/logout',
    controller: 'TopCtrl'
  })
  
  .when('/users/config', {
    templateUrl: '/v/users/config',
    controller: 'TopCtrl'
  })
  
  .when('/quiz', {
    templateUrl: '/v/quiz/list',
    controller: 'TopCtrl'
  })
  
  .when('/quiz/book', {
    redirectTo: '/v/quiz/book/list'
  })
  
  .when('/quiz/book/list', {
    templateUrl: '/v/quiz/book/list',
    controller: 'QuizBookCtrl'
  })
  
  .when('/quiz/book/one/:id', {
    templateUrl: '/v/quiz/book/one',
    controller: 'QuizBookCtrl'
  })
  
  .when('/quiz/book/start/:id', {
    templateUrl: '/v/quiz/book/start',
    controller: 'QuizBookCtrl'
  })
  
  .when('/quiz/genre', {
    redirectTo: '/quiz/genre/list'
  })
  
  .when('/quiz/genre/list', {
    templateUrl: '/v/quiz/genre/list',
    controller: 'QuizGenreCtrl'
  })
  
  .when('/quiz/genre/one/:id', {
    templateUrl: '/v/quiz/genre/one',
    controller: 'QuizGenreCtrl'
  })
  
  .when('/quiz/tag', {
    redirectTo: '/quiz/tag/list'
  })
  
  .when('/quiz/tag/list', {
    templateUrl: '/v/quiz/tag/list',
    controller: 'QuizTagCtrl'
  })
  
  .when('/quiz/tag/one/:id', {
    templateUrl: '/v/quiz/tag/one',
    controller: 'QuizTagCtrl'
  })
  
  .otherwise({
    redirectTo: '/info'
  });
}]);
