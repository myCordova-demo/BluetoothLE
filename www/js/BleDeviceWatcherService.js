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

        setTimeout(function () {
            me._resultCollection = [new BleDeviceItem("Sergei's Band 62:1d LE"), new BleDeviceItem("MI1A")];
            callback(me._resultCollection);
        }, 3000);
    }

    return BleDeviceWatcher;
}]);

