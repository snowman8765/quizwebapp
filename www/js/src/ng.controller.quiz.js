/** クイズを管理するためのクラス
 *  問題データの取得などを行う
 */
export default class QuizController {
  constructor($scope, $routeParams, $http) {
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$http = $http;
  }
  
  static activate($scope, $routeParams, $http) {
    QuizController.instance = new QuizController($scope, $routeParams, $http);
    return QuizController.instance;
  }
  
  getBookData() {
    console.log("QuizCtrl:getBookData():");
    this.id = this.$routeParams.id;
    
    let self = this;
    if(this.id != undefined) {
      console.log(this.id);
      this.$http.get("/v/quiz/book/one/"+this.id).success(function(data) {
        console.log(data);
        self.list = data;
      });
    }
  }
  
  startBookQuiz() {
    console.log("QuizCtrl:startBookQuiz():");
    this.id = this.$routeParams.id;
    if(this.id != undefined) {
      $("#loadingPanel").removeClass("hidden");
      this.$http.get("/v/quiz/book/start/"+this.id).success(function(data) {
        //$scope.list = data;
        QUIZ_LIST = data;
        QUIZ_DATA = data[0];
        $.getScript("/js/min/quiz.book.js");
        $("#loadingPanel").addClass("hidden");
      });
    }
  }
  
  getSingleData() {
    console.log("QuizCtrl:getSingleData():");
    this.id = this.$routeParams.id;
    if(this.id != undefined) {
      console.log(this.id);
      this.$http.get("/v/quiz/single/one/"+this.id).success(function(data) {
        this.list = data;
        QUIZ_DATA = data;
      });
    }
  }
  
  startSingleQuiz() {
    console.log("QuizCtrl:startSingleQuiz():");
    this.id = this.$routeParams.id;
    if(this.id != undefined) {
      this.$http.get("/v/quiz/single/start/"+this.id).success(function(data) {
        this.list = data;
        QUIZ_LIST = data;
        $.getScript("/js/quiz.book.js");
      });
    }
  }
  
  getGenreData() {
    console.log("QuizCtrl:getGenreData():");
    this.id = $routeParams.id;
    if(this.id != undefined) {
      console.log(this.id);
      this.$http.get("/v/quiz/genre/one/"+this.id).success(function(data) {
        //console.log(data);
        this.list = data;
      });
    }
  }
}
QuizController.$inject = ["$scope", "$routeParams", "$http"];
