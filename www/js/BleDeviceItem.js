var app = angular.module('starter');

app.factory('BleDeviceItem', function () {
    function BleDeviceItem(name, id) {
        this.name = name;
        this.id = name;
    }

    return BleDeviceItem;
});
