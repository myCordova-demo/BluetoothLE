var app = angular.module('starter');

app.factory('BleDeviceItem', function () {
    function BleDeviceItem(name) {
        this.name = name;
        this.id = name;
    }

    return BleDeviceItem;
});
