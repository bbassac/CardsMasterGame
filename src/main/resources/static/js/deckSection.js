var oldNbTrapsOpp=0 ;
var oldNbCards=-1;

function refreshByInterval() {
	refreshOpponentBoard();
	graveyardPlayerZone.fill(currentPlayerId);
}

function initPlayersId() {
	
	currentPlayerId = initCookie(COOKIE_PLAYER_ID, 0);
	opponentPlayerId = Math.abs(1-currentPlayerId);
	
	document.getElementById("currentPlayerId").value = currentPlayerId;
}

function changePlayersId() {
	
	currentPlayerId = document.getElementById("currentPlayerId").value;
	opponentPlayerId = Math.abs(1-currentPlayerId);
	
	setCookie(COOKIE_PLAYER_ID, currentPlayerId);
	refreshBoard();
}

function newTurn() {

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

function refreshBoard(){
	
    fillDraw(currentPlayerId);
    fillInvocation(currentPlayerId);
	environmentZone.fill(currentPlayerId);
    
    refreshOpponentBoard();
    refreshPlayerBoard();
}

function refreshOpponentBoard(){
    
    fillPVs(opponentPlayerId,"oppPvsId");
    fillChakras(currentPlayerId,"oppChakraId");
    fillNbTraps(opponentPlayerId, "nbTrapsId",trapIconHeight);
    fillNbCards(opponentPlayerId,"nbCardsId",nbCardsHeight);
    opponentBoardPlayerZone.fill(currentPlayerId);
    opponentAffiniteZone.fill(currentPlayerId);
    graveyardOpponentZone.fill(currentPlayerId);
	
    refreshLastDiceThrow();
    displayOppExtra(opponentPlayerId);
}

function refreshPlayerBoard(){

    fillPVs(currentPlayerId,"playerPvsId");
    fillChakras(currentPlayerId,"playerChakraId");
    fillDiceArea(currentPlayerId,"diceId");

	affiniteZone.fill(currentPlayerId);
    handZone.fill(currentPlayerId);
    boardPlayerZone.fill(currentPlayerId);
    graveyardPlayerZone.fill(currentPlayerId);
    trapsZone.fill(currentPlayerId);
    equipmentsZone.fill(currentPlayerId);
    displayExtraArea(currentPlayerId,"extraPlayerId");
}