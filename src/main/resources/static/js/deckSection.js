var oldNbTrapsOpp=0 ;
var oldLastGraveyard = [0, 0];
var oldNbCards=-1;

function refreshByInterval() {
	var currentPlayerId = document.getElementById("currentPlayerId").value;
	
	refreshOpponentBoard();
	fillGraveyard(currentPlayerId,"graveyardId");
}

function newTurn() {
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    //Piocher une carte
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentPlayerId+"/newcard", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

    //tourner les cartes du board
    var xhttp2 = new XMLHttpRequest();
    xhttp2.open("PUT", "player/"+currentPlayerId+"/board/set-not-active", false);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.send();

    //+1 au chakra si < MAX
    var xhttp3 = new XMLHttpRequest();
    xhttp3.open("GET", "maxchakra", false);
    xhttp3.setRequestHeader("Content-type", "application/json");
    xhttp3.send();
    var maxChakra = xhttp3.responseText;

    buttonMoreChakra = document.getElementById("ButtonMoreChakraID");
    if (buttonMoreChakra.tag <= maxChakra) {
        updateChakras(buttonMoreChakra.tag);
    }

    refreshBoard();
}

function refreshBoard(forceUpdate){

    var currentPlayerId = document.getElementById("currentPlayerId").value;

    fillDraw(currentPlayerId);
    fillInvocation(currentPlayerId);
	fillEnvironment();
	fillAffinite();
    
    refreshOpponentBoard(forceUpdate);
    refreshPlayerBoard(forceUpdate);
}

function refreshOpponentBoard(forceUpdate){
    
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var currentOppId = Math.abs(1-currentPlayerId);
    
    fillPVs(currentOppId,"oppPvsId");
    fillNbTraps(currentOppId, "nbTrapsId",trapIconHeight);
    fillNbCards(currentOppId,"nbCardsId",nbCardsHeight);
    fillOpponentBoard(currentOppId);
    fillGraveyard(currentOppId,"graveyardOppId", forceUpdate);
	
    refreshLastDiceThrow();
    displayOppExtra(currentOppId);
}

function refreshPlayerBoard(forceUpdate){

    var currentPlayerId = document.getElementById("currentPlayerId").value;

    fillPVs(currentPlayerId,"playerPvsId");
    fillChakras(currentPlayerId,"playerChakraId");
    fillDiceArea(currentPlayerId,"diceId");

	fillHand(currentPlayerId);
	fillBoardPlayer(currentPlayerId);
    fillGraveyard(currentPlayerId, "graveyardId", forceUpdate);
    fillTraps(currentPlayerId);
    fillEquipments(currentPlayerId);
    displayExtraArea(currentPlayerId,"extraPlayerId");
}