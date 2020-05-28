/**
 * Lance les scripts de l'application
 */

// identifiant des joueurs
var currentPlayerId;
var opponentPlayerId;
initPlayersId();

// Init des zones de cartes
var boardPlayerZone = new BoardPlayerZone();
var handZone = new HandPlayerZone();
var equipmentsZone = new EquipmentsPlayerZone();
var trapsZone = new TrapsPlayerZone();

var graveyardPlayerZone = new GraveyardCommonZone(MY_GRAVEYARD_ID);
var graveyardOpponentZone = new  GraveyardCommonZone(OPP_GRAVEYARD_ID);


var affiniteZone = new AffinitePlayerZone();
var environmentZone = new EnvironmentZone();
var opponentBoardPlayerZone = new BoardOpponentZone();
var opponentAffiniteZone = new AffiniteOpponentZone();
var opponentEquipmenstZone = new EquipmentsOpponentZone();


var hidenImage = new Image();
hidenImage.src = IMG_HIDDEN;
var visibleImage = new Image();
visibleImage.src = IMG_VISIBLE;


document.addEventListener('DOMContentLoaded', function() {
    refreshBoard();
}, false);

setInterval(refreshByInterval, 500);

refreshBoard();