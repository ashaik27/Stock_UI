
var app = angular.module('MyStockApp', ['ngRoute', 'ngAnimate', "ui.grid", "ui.grid.autoResize", "ui.grid.resizeColumns", "ui.grid.pagination", "ui.grid.selection", "ui.bootstrap"]);

// configure our routes
app.config(['$routeProvider', '$locationProvider', '$httpProvider', 
    function ($routeProvider, $locationProvider, $httpProvider) {

        $routeProvider
            ////.when('/login', {
            ////    templateUrl: './App/Views/login.html',
            ////    controller: 'LoginCtrl'
            ////})
            .when('/home', {
                templateUrl: './App/Views/home.html',
                controller: 'HomeCtrl',
            })
             .when('/stocks', {
                 templateUrl: './App/Views/stocks.html',
                 controller: 'StocksCtrl',
             })
             .when('/reports', {
                 templateUrl: './App/Views/reports.html',
                 controller: 'ReportsCtrl',
             })
            ////.when('/MyIRCResources', {
            ////    templateUrl: './App/Views/oermyircresources.html',
            ////    controller: 'OerMyIRCResourcesCtrl',
            ////})
   
            .otherwise({
                redirectTo: '/home'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('');
    }]);