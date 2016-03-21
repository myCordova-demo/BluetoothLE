// Ionic Starter App

window.ionic.Platform.ready(function () {
    angular.bootstrap(document, ['starter']);
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if(cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }

        //startScan();
      });
})

//function startScan() {


//    function startScanSuccess() {
//        console.log('startScanSuccess');
//    }

//    function handleError(err) {
//        console.log('handleError');
//    }


//    bluetoothle.initialize(function (result) {
//        if (result.status !== "enabled") {
//            handleError("Bluetooth is not enabled; status: " + result);
//            return;
//        }
//        bluetoothle.startScan(startScanSuccess, handleError, { services: [] });
//    }, handleError, { request: true, statusReceiver: false });
//}

