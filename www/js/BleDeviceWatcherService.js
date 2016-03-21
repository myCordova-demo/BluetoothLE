var app = angular.module('starter');

app.factory('BleDeviceWatcherService', ['BleDeviceItem', function (BleDeviceItem) {
    function BleDeviceWatcher() {
        this._resultCollection = [];
    }

    BleDeviceWatcher.prototype.start = function (callback) {
        if (typeof bluetoothle === 'undefined') {
            throw new Error('cordova-plugin-bluetoothle is not installed');
        };

        var me = this;
        // Clean results first
        me._resultCollection = [];
        var scanFailed = false;

        bluetoothle.startScan(function (scanResult) {
            if (scanResult.status === 'scanResult ') {
                me._resultCollection.push(new BleDeviceItem(scanResult.name, scanResult.address.replace(/:/g, '')));
            }
        }, function (error) {
            scanFailed = true;
            callback(new Error(error));
        });

        setTimeout(function () {
            bluetoothle.stopScan(); // Not interested in handling success/error here
            if (!scanFailed) {
                callback(me._resultCollection);
            }
        }, 3000);
    }

    return BleDeviceWatcher;
}]);

