angular.module('quizApp', ['ngRoute','quizApp.controllers'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
  
  .when('/', {
    templateUrl: '/v/index',
    controller: 'TopCtrl'
  })
  
  .when('/index', {
    redirectTo: '/'
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
  
  .when('/users', {
    redirectTo: '/users/home'
  })
  
  .when('/users/home', {
    templateUrl: '/v/users/home',
    controller: 'TopCtrl'
  })
  
  .when('/users/login', {
    templateUrl: '/v/users/login',
    controller: 'UserLoginCtrl'
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
    redirectTo: '/quiz/book/list'
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
    controller: 'QuizBookStartCtrl'
  })
  
  .when('/quiz/single', {
    redirectTo: '/quiz/single/list'
  })
  
  .when('/quiz/single/list', {
    templateUrl: '/v/quiz/single/list',
    controller: 'QuizSingleCtrl'
  })
  
  .when('/quiz/single/one/:id', {
    templateUrl: '/v/quiz/single/one',
    controller: 'QuizSingleCtrl'
  })
  
  .when('/quiz/single/start/:id', {
    templateUrl: '/v/quiz/single/start',
    controller: 'QuizSingleStartCtrl'
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
