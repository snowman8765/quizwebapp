/** アプリの設定
 */
export default class QuizAppConfig {
  constructor($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
  
  static activate($locationProvider) {
    QuizAppConfig.instance = new QuizAppConfig($locationProvider);
    return QuizAppConfig.instance;
  }
}

QuizAppConfig.$inject = ["$locationProvider"];
