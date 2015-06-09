'use strict';
angular.module('main')
.controller('StartCtrl', function ($scope, $timeout, Start, Config) {

  // bind data from service

  $scope.unidades = Start.unidades;
  $scope.valor = Start.valor;
  $scope.metros = Start.metros;
  $scope.waitTime = Start.waitTime;

  $scope.lastLoc = Start.lastLoc;
  $scope.newLoc = Start.newLoc;
  $scope.ENV = Config.ENV;
  $scope.BUILD = Config.BUILD;
  $scope.run = Start.run;
  $scope.EarthR = Start.EarthR;
  $scope.msg = Start.msg;

  $scope.distance = function (lat1, lat2, lon1, lon2) {

    var rad1 = $scope.toRadians(lat1);
    var rad2 = $scope.toRadians(lat2);
    var ang1 = $scope.toRadians(lat2 - lat1);
    var ang2 = $scope.toRadians(lon2 - lon1);

    var a = Math.sin(ang1 / 2) * Math.sin(ang1 / 2) +
        Math.cos(rad1) * Math.cos(rad2) *
        Math.sin(ang2 / 2) * Math.sin(ang2 / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return $scope.EarthR * c;
  };

  $scope.toRadians = function (Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
  };

  $scope.StartStop = function () {
    Start.run = !Start.run;
    $scope.run = Start.run;
    if (Start.run) {
      $scope.msg = Start.msgFin;
      Start.unidades = Start.banderazo;
      $scope.unidades = Start.unidades;
      $scope.calcPriceUnits();
      $scope.loop();
    } else {
      $scope.msg = Start.msgInc;
      Start.unidades = 0;
    }
  };

  $scope.loop = function () {
    if ($scope.run) {
      //$scope.$apply();
      $scope.getLocation();
    }
  };

  $scope.getLocation = function () {
    var locOptions = {
            timeout: 5000,
            enableHighAccuracy: true
          };
    navigator.geolocation.getCurrentPosition($scope.onLocationSuccess, $scope.onLocationError, locOptions);
  };

  $scope.onLocationError = function (e) {
    console.log('Geolocation error: #' + e.code + '\n' + e.message);
    $timeout( $scope.getLocation, 11000);
  };

  $scope.onLocationSuccess = function (loc) {
    $scope.someData = loc;
    $scope.loop();
    Start.lastLoc = Start.newLoc;
    Start.newLoc = loc;
    if (typeof Start.lastLoc !== 'undefined') {
      var testDis = $scope.distance (Start.newLoc.coords.latitude, Start.lastLoc.coords.latitude,
        Start.newLoc.coords.longitude, Start.lastLoc.coords.longitude);
      //alert('Ok dis: ' + testDis);
      Start.metros += testDis;
      $scope.metros = Start.metros;
    }
    $scope.calcPriceUnits();
    $timeout($scope.getLocation, 8000);
  };

  $scope.calcPriceUnits = function () {
    Start.unidades += (Start.metros % Start.metrUnd);
    $scope.unidades = Start.unidades;
    var val = Start.unidades * Start.undTx;
    if (val > Start.minima) {
      Start.valor = val;
      $scope.valor = Start.valor;
    } else {
      Start.valor = Start.minima;
      $scope.valor = Start.valor;
    }
  };

  console.log('Hello from your Controller: StartCtrl in module main:. This is your controller:', this);
  // TODO: do your controller thing
});
