angular.module('quizApp.controllers', [])
.controller('TopCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    console.log("TopCtrl:");
  }
])

.controller('QuizBookCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    console.log("QuizBookCtrl:");
    var id = $routeParams.id;
    $scope.id = $routeParams.id;
    if(id != undefined) {
      console.log(id);
      $http.get('/v/quiz/book/one/'+id).success(function(data) {
        console.log(data);
        $scope.list = data;
      });
    }
  }
])

.controller('QuizBookStartCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    console.log("QuizBookStartCtrl:");
    var id = $routeParams.id;
    $scope.id = $routeParams.id;
    if(id != undefined) {
      $http.get('/v/quiz/book/start/'+id).success(function(data) {
        $scope.list = data;
        QUIZ_LIST = data;
        $.getScript("/js/quiz.book.js");
      });
    }
  }
])

.controller('QuizSingleCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    console.log("QuizSingleCtrl:");
    var id = $routeParams.id;
    $scope.id = $routeParams.id;
    if(id != undefined) {
      console.log(id);
      $http.get('/v/quiz/single/one/'+id).success(function(data) {
        $scope.list = data;
        QUIZ_DATA = data;
      });
    }
  }
])

.controller('QuizSingleStartCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    console.log("QuizSingleStartCtrl:");
    var id = $routeParams.id;
    $scope.id = $routeParams.id;
    if(id != undefined) {
      $http.get('/v/quiz/single/start/'+id).success(function(data) {
        $scope.list = data;
        QUIZ_LIST = data;
        $.getScript("/js/quiz.book.js");
      });
    }
  }
])
                        
.controller('QuizGenreCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    console.log("QuizGenreCtrl:");
    console.log($routeParams);
    var id = $routeParams.id;
    $scope.id = $routeParams.id;
    if(id != undefined) {
      console.log(id);
      $http.get('/v/quiz/genre/one/'+id).success(function(data) {
        //console.log(data);
        $scope.list = data;
      });
    }
  }
]);
