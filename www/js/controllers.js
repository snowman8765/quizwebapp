var LOGIN = {name:"tab-login", icon:"ion-log-in", title:"ログイン", path:"logoin"};
var LOGOUT = {name:"tab-logout", icon:"ion-power", title:"ログアウト", path:"logout"};
var SAMPLE_USER = {id:0, name:"hoge", comment:"I can do it."};

angular.module('starter.controllers', [])

.controller('TopCtrl', function($scope) {
  console.log("TopCtrl:$scope="+$scope);
  $scope.project = {title:"オンラインクイズアプリケーション2"};
  $scope.user = SAMPLE_USER;
  if($scope.user.id == 0) {
    $scope.logout = LOGIN;
  } else {
    $scope.logout = LOGOUT;
  }
})

.controller('HtmlCtrl', function($scope) {
  console.log("HtmlCtrl:$scope="+$scope);
    $scope.basePath = window.location.pathname;
    console.log($scope.basePath);
})

.controller('MainPageCtrl', function($scope) {
  console.log("MainPageCtrl:$scope="+$scope);
})

.controller('UserPageCtrl', function($scope) {
  console.log("UserPageCtrl:$scope="+$scope);
})

.controller('QuizPageCtrl', function($scope) {
  console.log("QuizPageCtrl:$scope="+$scope);
});
