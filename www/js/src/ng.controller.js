/** アプリのコントローラ全般
 */
//import angular from "../../lib/angular-1.5.5/angular";
import TopController from "./ng.controller.top";
import QuizController from "./ng.controller.quiz";
import UserController from "./ng.controller.user";

export var ctrls = angular.module("quizApp.Controllers", []);

ctrls.controller(TopController.name, TopController);
ctrls.controller(QuizController.name, QuizController);
ctrls.controller(UserController.name, UserController);
