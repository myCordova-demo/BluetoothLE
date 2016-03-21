var app = angular.module('starter');

app.factory('BleDeviceWatcherService', ['$q', 'BleDeviceItem', function ($q, BleDeviceItem) {
    function BleDeviceWatcher() {
        this._resultCollection = [];
        this._collectionUpdatedCallback = null;
    }

    BleDeviceWatcher.prototype.onDeviceInfoUpdate = function (deviceInfoUpdate) {
        var device = BleDeviceItem.fromRawInfo(deviceInfoUpdate);
        //this.collectionUpdatedcallback
    }

    BleDeviceWatcher.prototype.start = function (collectionUpdatedCallback) {
        if (typeof bluetoothle === 'undefined') {
            throw new Error('cordova-plugin-bluetoothle is not installed');
        };

        // save callaback
        this._collectionUpdatedCallback = collectionUpdatedCallback;

        var me = this;

        var deferred = $q.defer();

        function scanCallback(result) {
            if (result.status == "scanResult") {
                me.onDeviceInfoUpdate(result)
            } else {
            }
            
        }

        function handleCordovaError(err) {
            deferred.reject(err);
        }

        // Initialize BT
        bluetoothle.initialize(function (result) {
            // ensure BT is enabled
            if (result.status !== "enabled") {
                handleCordovaError(new Error("Bluetooth is not enabled; status: " + result));
                return;
            }

            // Start scan: first callback will contain status info (succesfully?), other will have device information
            bluetoothle.startScan(scanCallback, handleCordovaError, { services: [] });

        }, handleCordovaError, { request: true, statusReceiver: false });

        return deferred.promise;
    }

    BleDeviceWatcher.prototype.stop = function () {
        if (typeof bluetoothle === 'undefined') {
            throw new Error('cordova-plugin-bluetoothle is not installed');
        };

        var me = this;

        var deferred = $q.defer();

        function handleCordovaSuccess() {
            deferred.resolve();
        }

        function handleCordovaError(err) {
            deferred.reject(err);
        }

        bluetoothle.startScan(handleCordovaSuccess, handleCordovaError);

        return deferred.promise;
    }

    return BleDeviceWatcher;
}]);
