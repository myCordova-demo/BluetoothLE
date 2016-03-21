var app = angular.module('starter');

app.controller('MainController', ['$scope', 'BleDeviceWatcherService', function ($scope, BleDeviceWatcherService) {

    $scope.model = {
        devices: []
    };

    $scope.connect = function (item) {
        navigator.notification.alert('Connect to: ' + item.id);
    }

    var watcher = new BleDeviceWatcherService();

    watcher.start(function (devicesCollection) {
        $scope.$apply(function () {
            $scope.model.devices = devicesCollection;
        });
    });
}]);