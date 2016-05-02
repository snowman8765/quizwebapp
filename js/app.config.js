quizApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'template/index.html'
    })
    .when('/main', {
      templateUrl: 'template/main.html',
      controller: 'MainPageCtrl'
    })
    .when('/about', {
      templateUrl: 'template/about.html'
    })
    .when('/user/login', {
      templateUrl: 'template/login.html',
      controller: 'UserPageCtrl'
    })
    .when('/user/:id/config', {
      templateUrl: 'template/userconfig.html',
      controller: 'UserPageCtrl'
    })
    .when('/user/:id/logout', {
      redirectTo: '/',
      controller: 'UserPageCtrl'
    })
    .when('/quiz', {
      templateUrl: 'template/quiz.html',
      controller: 'QuizPageCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
}]);
