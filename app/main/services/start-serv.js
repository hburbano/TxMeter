'use strict';
angular.module('main')
.service('Start', function () {
  console.log('Hello from your Service: Start in module main');

  this.unidades = 0;
  this.valor = 0;
  this.metros = 0;
  this.metrUnd = 10;
  this.undTx = 90;
  this.minima = 1700;
  this.secWait = 50;
  this.banderazo = 17;
  this.EarthR = 6371000; // Earth radius meters
  this.disMinima = 10;
  this.ls;
  this.lc;
  this.lastLoc;
  this.newLoc;
  this.run = false;
  this.waitTime = 0.0;
  this.msgInc = 'Iniciar recorrido';
  this.msgFin = 'Finalizar recorrido';
  this.msg = this.msgInc;
  // TODO: do your service thing
});
