/** アプリのコントローラ全般
 */
//import angular from "../../lib/angular-1.5.5/angular";
import FaviconService from "./ng.service.favicon";

export var srvcs = angular.module("quizApp.Services", []);

srvcs.factory(FaviconService.name, FaviconService.activate);
