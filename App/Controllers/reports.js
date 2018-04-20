app.controller('ReportsCtrl', ['$scope', '$http', '$timeout', 'uiGridConstants', 'StockService', function ($scope, $http, $timeout, uiGridConstants, StockService) {
    var options = {};
    options.userId = 1;
    $scope.stockOhlcList = [];
    StockService.get(options).success(function (data) {
        $scope.stocks = [];
        var stockIds = [];
        if (data != null) {
            angular.forEach(data, function (item) {
                var stock = item.stockId;
                if (stockIds.indexOf(stock) == -1) {
                    stockIds.push(stock);
                    $scope.stocks.push({ id: item.stock, name: item.stockName });
                }
            });
        }
        console.log($scope.stocks);
    }).error(function (data) {
        console.log("unexpected error while loading StockS graph!")
    });

    google.charts.load('current', { 'packages': ['corechart'] });
   
    StockService.getStockOhlcv(options).success(function (data) {
        var dateArray;
        
        if (data != null) {
            angular.forEach(data, function (item) {
                dateArray = item.date.split('-');
                console.log(dateArray);
                $scope.stockOhlcList.push([
                     new Date(dateArray[0], dateArray[1], dateArray[2]), item.low, item.open, item.close, item.high
                ]);
            });
        }
        google.charts.setOnLoadCallback(drawChart);
        console.log($scope.stockOhlcList);
    }).error(function (data) {
        console.log("unexpected error while loading stock OHLCV graph!")
    });

    function drawChart() {
        var data = google.visualization.arrayToDataTable($scope.stockOhlcList, true);

        var options = {
            legend: 'none',
            bar: { groupWidth: '100%' }, // Remove space between bars.
            candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
            }
        };

        var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

}]);
