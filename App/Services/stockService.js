'use strict'

angular.module('MyStockApp')
.service('StockService', ['$http', function ($http) {
    return {
        get: function (options) {

            var url = 'http://localhost:8080/StockAPI/' + 'agent/stocks/' + options.userId;
            var req = {
                method: 'GET',
                url: url
            }
            return $http(req);
        },
        getPurchases: function (options) {

            var url = 'http://localhost:8080/StockAPI/' + 'stock/purchases/' + options.userId;
            var req = {
                method: 'GET',
                url: url
            }
            return $http(req);
        },
        getStockOhlcv: function (options) {

        var url = 'http://localhost:8080/StockAPI/' + 'stock/ohlcv/' + options.userId;
        var req = {
            method: 'GET',
            url: url
        }
        return $http(req);
    }
    }
}])