'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'simpleCalc',
  'scientificCalc'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.when('/simple', {
    templateUrl: '/components/simple-calc/simple-calc.tpl.html',
    controller: 'SimpleCalcCtrl'
  }).
  when('/scientific', {
    templateUrl: '/components/scientific-calc/scientific-calc.tpl.html',
    controller: 'ScientificCalcCtrl'
  }).
  otherwise({redirectTo: '/simple'});
}]);
