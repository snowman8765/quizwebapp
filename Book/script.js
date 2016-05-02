(function(angular) {
  'use strict';
angular.module('ngViewExample', ['ngRoute', 'ngAnimate'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/:bookId', {
          templateUrl: 'book.html',
          controller: 'BookCtrl',
          controllerAs: 'book'
        })
        .when('/:bookId/ch/:chapterId', {
          templateUrl: 'chapter.html',
          controller: 'ChapterCtrl',
          controllerAs: 'chapter'
        });

      $locationProvider.html5Mode(true);
  }])
  .controller('MainCtrl', ['$route', '$routeParams', '$location',
    function($route, $routeParams, $location) {
      this.$route = $route;
      this.$location = $location;
      this.$routeParams = $routeParams;
  }])
  .controller('BookCtrl', ['$routeParams', function($routeParams) {
    this.name = "BookCtrl";
    this.params = $routeParams;
  }])
  .controller('ChapterCtrl', ['$routeParams', function($routeParams) {
    this.name = "ChapterCtrl";
    this.params = $routeParams;
  }]);
})(window.angular);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/