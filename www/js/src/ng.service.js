var srvcs = angular.module('quizApp.Services', []);

srvcs.factory("FaviconService", function(){
  var favicon = new Favico({
    //animationを切る
    animation: "pop"
  });
  var badge = function(num){
    favicon.badge(num);
  };

  return {
    badge: badge
  };
});
