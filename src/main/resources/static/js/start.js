/**
 * Lance les scripts de l'application
 */

var boardPlayerZone = new BoardPlayerZone();
var handZone = new HandZone();
var equipmentsZone = new EquipmentsZone();
var trapsZone = new TrapsZone();
var graveyardZones = {MY_GRAVEYARD_ID:new GraveyardZone(MY_GRAVEYARD_ID), OPP_GRAVEYARD_ID:new GraveyardZone(OPP_GRAVEYARD_ID)};
var affiniteZone = new AffiniteZone();
var environmentZone = new EnvironmentZone();

var opponentBoardPlayerZone = new OpponentBoardPlayerZone();
var opponentAffiniteZone = new OpponentAffiniteZone();

document.addEventListener('DOMContentLoaded', function() {
    refreshBoard();
}, false);

setInterval(refreshByInterval, 500);

refreshBoard();