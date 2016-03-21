var app = angular.module('starter');

app.factory('BleDeviceItem', function () {
    function BleDeviceItem() {
        this.id = null;
        this.name = null;
        this.address = null;
        this.advertisement = null;
    }

    BleDeviceItem.fromRawInfo = function (rawInfo) {

        var item = new BleDeviceItem();

        ['address', 'advertisement', 'name'].forEach(function(prop) {
            item[prop] = rawInfo[prop];
        });

        // peripheral id is mac address w/o ':' delimiter
        item.id = item.address.split(':').join('');

        return item;

    }

    return BleDeviceItem;
});
