angular.module('starter.controllers', [])

.controller('TopCtrl', function($scope) {
  $scope.data = {id:0, name:"hoge"};
  $scope.logout = {name:"tab-logout", icon:"ion-power", title:"ログアウト", path:"logout"};
})

.controller('HtmlCtrl', function($scope) {
    $scope.basePath = window.location.pathname;
    console.log($scope.basePath);
})

.controller('MainPageCtrl', function($scope) {
})

.controller('UserPageCtrl', function($scope) {
})

.controller('QuizPageCtrl', function($scope) {
});
