app.controller('HomeCtrl', ['$scope','$http', '$timeout', 'uiGridConstants', 'StockService', function ($scope, $http, $timeout, uiGridConstants, StockService) {
    var options = {};
    google.charts.load('current', { 'packages': ['corechart'] });
    $scope.dataTable = [];
    $scope.dataTableLineChart = [];
    options.userId = 1;

    StockService.get(options).success(function (data) {
        $scope.dataTable.push(['Task', 'Hours per Day']);
        if (data != null) {
            $scope.data = data;
            angular.forEach(data, function (item) {
                $scope.dataTable.push([item.stockName, item.purchasePrice]);
               
            });
            google.charts.setOnLoadCallback(drawChart);
        }
    }).error(function (data) {
        console.log("unexpected error in loading StockService!")
    });
    function drawChart() {

       // var data = $scope.dataTable;
           var data =  google.visualization.arrayToDataTable($scope.dataTable);
           console.log($scope.dataTable);
           console.log(data);
        var options = {
            title: 'Investment Ratio'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }

    google.charts.load('current', { packages: ['corechart', 'line'] });
    var dateArray;
    StockService.getPurchases(options).success(function (data) {
       // $scope.dataTableLineChart.push(['date', 'Month']);
        if (data != null) {
            $scope.data = data;
            angular.forEach($scope.data, function (item) {
                dateArray = item.purchaseDate.split('-');
                $scope.dataTableLineChart.push([new Date(dateArray[2], dateArray[1]), item.purchasePrice, item.sellingPrice]);
            });
            google.charts.setOnLoadCallback(drawCrosshairs);
        }
    }).error(function (data) {
        console.log("unexpected error in loading disaggregation filters in roster grid!")
    });
    function drawCrosshairs() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Month');
        data.addColumn('number', 'Purchase Price');
        data.addColumn('number', 'Selling Price');
        data.addRows($scope.dataTableLineChart);
        console.log($scope.dataTableLineChart);
        var options = {
            title  :"Investment Return",
            hAxis: {
                title: 'Time Period',
                format: 'MMM'
            },
            vAxis: {
                title: 'Inverstment($)'
            },
            colors: ['#01A9DB', '#097138'],
            crosshair: {
                color: '#000',
                trigger: 'selection'
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

        chart.draw(data, options);
        chart.setSelection([{ row: 38, column: 1 }]);

    }
    
}]);
