 var app = angular.module('app', ['ui.router', 'controllers'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider

      .state('route2',{
        url: '/route2',
        templateUrl: 'templates/route2.html',
        controller: 'route2Controller'
      })

    }])




