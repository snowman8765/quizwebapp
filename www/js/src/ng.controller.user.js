/** ユーザに関するコントローラ用クラス
 */
export default class UserController {
  constructor($scope, $http, $location) {
    this.$scope = $scope;
  }
  
  static activate($scope, $http, $location) {
    UserController.instance = new UserController($scope, $http, $location);
    return UserController.instance;
  }
  
  signup() {
    this.user = {};
    this.inputTitle = "登録情報";
    this.submitBtn = "登録";
    
    let self = this;
    this.submitForm = function() {
      console.log(self.user);
      self.$http({
        method: "POST",
        url: "/v/users/signup",
        data: $.param({
          userid: self.user.userid,
          password: self.user.password
        }),
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
        
      }).success(function(data) {
        self.result = data;
      });
    };
  }
  
  login(){
    this.user = {};
    this.inputTitle = "ログイン情報";
    this.submitBtn = "ログイン";
    this.result = {};
    
    let self = this;
    this.submitForm = function() {
      console.log("UserLoginCtrl:submitForm():");
      if(!self.user.userid) {
        self.user.userid = "guest";
        self.user.password = "guest";
      }
      $http({
        method: "POST",
        url: "/v/users/login",
        data: $.param({
          userid: self.user.userid,
          password: self.user.password
        }),
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
        
      }).success(function(data) {
        self.result = data;
        if(data.flag) {
          self.$location.path("/users/home");
          socket.emit("login", data.displayname);
        }
      });
    };
  }
  
  logout() {
    this.$location.path("/");
    hideUserInfo();
  }
}
UserController.$inject = ["$scope", "$http", "$location"];
