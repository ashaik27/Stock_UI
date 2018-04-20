app.controller('StocksCtrl', ['$scope', '$http', '$timeout', 'uiGridConstants', 'StockService', function ($scope, $http, $timeout, uiGridConstants, StockService) {


    var options = {};
    $scope.data = [];
    $scope.columns = [
        { field: 'stockId', name: 'Stock ID', enableFiltering: true },
        { field: 'stockName', name: 'Stock Name', enableFiltering: true },
        { field: 'stockCode', name: 'Code', enableFiltering: true },
        { field: 'quantity', name: 'Quantity', enableFiltering: true },
        { field: 'purchaseDate', name: 'Purchase Date', enableFiltering: true },
        { field: 'purchasePrice', name: 'Purchase Price', enableFiltering: true },
        { field: 'sellingPrice', name: 'Selling Price', enableFiltering: true }];

    $scope.gridOptions = {
        paginationPageSize: 20,
        enablePaginationControls: true,
        enableSorting: true,
        enableFiltering: true,
        enableRowSelection: true,
        multiSelect: true,
        enableRowHeaderSelection: true,
        enableSelectAll: true,
        columnDefs: $scope.columns,
    };
    options.userId = 1;

    StockService.get(options).success(function (data) {
        if (data != null) {
            $scope.data = data;
            $scope.gridOptions.data = $scope.data;
        }
    }).error(function (data) {
        console.log("unexpected error in loading disaggregation filters in roster grid!")
    });
}]);
