/**
 * Gestion des invocations 
 */
 
 function fillInvocation(currentPlayerId) {
 
    var src = document.getElementById("invocations");
    src.innerHTML = '';

    var img = document.createElement("img");
    img.src = CARD_IMG_BACK_AFFINITE;
    img.height = drawImageHeight;
    img.id = "imgInvocation";
    img.title = "Piocher une carte";
    img.draggable = false;
	
	img.setAttribute('title', "Piocher une carte d'invocation");
	img.addEventListener("click", showPopinInvocations);
	
	src.appendChild(img);
 }

function showPopinInvocations() {

	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "stack/INVOCATIONS", false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
	var cards = JSON.parse(xhttp.responseText);
	
	displayPopinSelectCard("me", cards, putCardFromInvocationToPlayer, "url('img/Invocation.png')");

}

function putCardFromInvocationToPlayer(playerId, card, who) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/" + playerId + "/invocations/" + card.id, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

    handZone.fill(playerId);
}
