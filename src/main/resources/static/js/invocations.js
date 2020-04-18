/**
 * Gestion des invocations 
 */
 
 function initInvocationsDeck(currentPlayerId, drawImageHeight) {
 
	var img = document.getElementById("imgInvocation");
	
	if (drawImageHeight) {
		img.height = drawImageHeight;
	}
	
	img.setAttribute('title', "Piocher une carte d'invocation");
	img.addEventListener("click", showPopinInvocations);
 }

function showPopinInvocations() {

	var who = "me"
	var currentPlayerId = document.getElementById("currentPlayerId").value;
	var oppPlayerId = Math.abs(1-currentPlayerId);
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "stack/INVOCATIONS", false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
	var cards = JSON.parse(xhttp.responseText);
	
	displayPopinSelectCard("me", cards, putCardFromInvocationToPlayer, "url('../img/Back-Invocations.png')");

}

function putCardFromInvocationToPlayer(playerId, who) {
	
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/invocations/"+this.cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

	hideCardSelectPopin();
    refreshBoard();
}