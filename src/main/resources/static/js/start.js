/**
 * Lance les scripts de l'application
 */

// Init des zones de cartes
var boardPlayerZone = new BoardPlayerZone();
var handZone = new HandPlayerZone();
var equipmentsZone = new EquipmentsPlayerZone();
var trapsZone = new TrapsPlayerZone();
var graveyardZones = {MY_GRAVEYARD_ID:new GraveyardCommonZone(MY_GRAVEYARD_ID), OPP_GRAVEYARD_ID:new GraveyardCommonZone(OPP_GRAVEYARD_ID)};
var affiniteZone = new AffinitePlayerZone();
var environmentZone = new EnvironmentZone();
var opponentBoardPlayerZone = new BoardOpponentZone();
var opponentAffiniteZone = new AffiniteOpponentZone();


document.addEventListener('DOMContentLoaded', function() {
    refreshBoard();
}, false);

setInterval(refreshByInterval, 500);

refreshBoard();