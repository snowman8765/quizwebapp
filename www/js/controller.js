angular.module('quizApp.controllers', [])
.controller('TopCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
  }
])

.controller('QuizBookCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    var id = $routeParams.id;
    if(id != undefined) {
      console.log(id);
      $http.get('/v/quiz/book/one/'+id).success(function(data) {
        console.log(data);
        $scope.list = data;
      });
    }
  }
])
                        
.controller('QuizGenreCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    var id = $routeParams.id;
    if(id != undefined) {
      $http.get('/v/quiz/genre/one/'+id).success(function(data) {
        //console.log(data);
        $scope.list = data;
      });
    }
  }
]);
