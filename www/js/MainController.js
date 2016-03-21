var app = angular.module('starter');

app.controller('MainController', ['$scope', 'BleDeviceWatcherService', function ($scope, BleDeviceWatcherService) {

    $scope.model = {
        devices: []
    };

    $scope.connect = function (item) {
        navigator.notification.alert('Connect to: ' + item.id);
    }

    var watcher = new BleDeviceWatcherService();

    // Demonstrates watcher.start usage
    watcher.start(function (devicesCollection) {
        $scope.$apply(function () {
            $scope.model.devices = devicesCollection;
        });
    }).then(function () {
        console.log('DeviceWatcherService has been started');
    }, function (err) {
        navigator.notification.alert('Unable to start watcher: ' + err.mesage);
    });

    // Demonstrates watcher.stop usage (will be called automatically after 15s)
    setTimeout(function () {
        watcher.stop(function (devicesCollection) {
            $scope.$apply(function () {
                $scope.model.devices = devicesCollection;
            });
        }).then(function () {
            console.log('DeviceWatcherService has been stopped');
        }, function (err) {
            navigator.notification.alert('Unable to stop watcher: ' + err.mesage);
        });
    }, 15000);

}]);