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
    }).then(function () {
        console.log('DeviceWatcherService has successfully started');
    }, function (err) {
        navigator.notification.alert('Unable to start watcher: ' + err);
    })
}]);