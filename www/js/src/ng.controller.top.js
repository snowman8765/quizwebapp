/** 画面全体に関するコントローラ用クラス
 */
export default class TopController {
  constructor($scope, FaviconService, $window) {
    this.$scope = $scope;
    this.favService = FaviconService;
    this.$window = $window;
  }
  
  static activate($scope, FaviconService, $window) {
    TopController.instance = new TopController($scope, FaviconService, $window);
    return TopController.instance;
  }
  
  favicon() {
    this.favService.badge(3);
  }
  
  reload() {
    this.$window.location.href = "/";
  }
}
TopController.$inject = ["$scope","FaviconService", "$window"];
