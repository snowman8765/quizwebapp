/** AngularJSを利用した
 */
import angular from "../../lib/angular-1.5.5/angular.min";
import "../../lib/angular-1.5.5/angular-route.min";

import QuizAppConfig from "./ng.config";
import QuizAppConfigRoute from "./ng.config.route";

import "./ng.controller";
import "./ng.service";

export var quizApp = angular.module("quizApp", [
  "ngRoute",
  "quizApp.Controllers",
  "quizApp.Services"
]);

quizApp.config(QuizAppConfig.activate);
quizApp.config(QuizAppConfigRoute.activate);
