/** 画面全体に関するコントローラ用クラス
 */
export default class FaviconService {
  constructor() {
    this.favicon = new Favico({
      animation: "pop"
    });
  }
  
  badge(num){
    this.favicon.badge(num);
  }
  
  static activate() {
    FaviconService.instance = new FaviconService();
    return FaviconService.instance;
  }
}
FaviconService.activate.$inject = [];
