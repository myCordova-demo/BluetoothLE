var app = angular.module('starter');

app.factory('BleDeviceWatcherService', ['$q', 'BleDeviceItem', function ($q, BleDeviceItem) {
    function BleDeviceWatcher() {
        this._resultCollection = [];
        this._collectionUpdatedCallback = null;
    }

    BleDeviceWatcher.prototype.onDeviceInfoUpdate = function (deviceInfoUpdate) {
        var device = BleDeviceItem.fromRawInfo(deviceInfoUpdate);
        
        var alreadyExists = false;
        var isDirty = false;
        this._resultCollection.forEach(function (value, index, array) {
            if (value.id == device.id) {

                alreadyExists = true;

                // Don't send notification if name or address have not been changed
                // This prevents too often callback calls.
                isDirty = value.name !== device.name || value.address !== device.address;

                if (isDirty) {
                    array[index] = device;
                }
                
            }
        });

        if (alreadyExists && !isDirty) {
            return;
        }

        if (!alreadyExists) {
            this._resultCollection.push(device);
        }

        // How cordova-plugin-bluetoothle handles deleted/removed event??

        if (this._collectionUpdatedCallback) {
            this._collectionUpdatedCallback(this._resultCollection);
        }

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
            deferred.resolve();

            if (result.status == "scanResult") {
                // callback contains scan results
                me.onDeviceInfoUpdate(result)
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

        bluetoothle.stopScan(handleCordovaSuccess, handleCordovaError);

        return deferred.promise;
    }

    return BleDeviceWatcher;
}]);
