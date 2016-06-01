ctrls.controller("UserCtrl", ["$scope", function($scope) {
}]);

ctrls.controller("UserSignupCtrl", ["$scope", "$routeParams", "$http", "$location",
  function($scope, $routeParams, $http, $location) {
    $scope.user = {};
    $scope.inputTitle = "登録情報";
    $scope.submitBtn = "登録";
    $scope.submitForm = function() {
      console.log($scope.user);
      $http({
        method: "POST",
        url: "/v/users/signup",
        data: $.param({
          userid: $scope.user.userid,
          password: $scope.user.password
        }),
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
        
      }).success(function(data) {
        $scope.result = data;
      });
    };
  }
]);

ctrls.controller("UserLoginCtrl", ["$scope", "$routeParams", "$http", "$location",
  function($scope, $routeParams, $http, $location) {
    $scope.user = {};
    $scope.inputTitle = "ログイン情報";
    $scope.submitBtn = "ログイン";
    $scope.submitForm = function() {
      console.log("UserLoginCtrl:submitForm():");
      if(!$scope.user.userid) {
        $scope.user.userid = "guest";
        $scope.user.password = "guest";
      }
      $http({
        method: "POST",
        url: "/v/users/login",
        data: $.param({
          userid: $scope.user.userid,
          password: $scope.user.password
        }),
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
        
      }).success(function(data) {
        $scope.result = data;
        if(data.flag) {
          $location.path("/users/home");
          socket.emit("login", data.displayname);
        }
      });
    };
  }
]);

ctrls.controller("UserLogoutCtrl", ["$scope", "$location", function($scope, $location) {
  $location.path("/");
  hideUserInfo();
}]);
