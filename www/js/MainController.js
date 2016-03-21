var app = angular.module('starter');

app.controller('MainController', ['$scope', 'BleDeviceWatcherService', function ($scope, BleDeviceWatcherService) {

    $scope.model = {
        devices: []
    };

    var watcher = new BleDeviceWatcherService();

    watcher.start(function (devicesCollection) {
        $scope.$apply(function () {
            $scope.model.devices = devicesCollection;
        });
    });
}]);