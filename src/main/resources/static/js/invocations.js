/**
 * Gestion des invocations 
 */
 
 function fillInvocation(currentPlayerId) {
 
    var src = document.getElementById("invocations");
    src.innerHTML = '';

    var img = document.createElement("img");
    img.src = encodeURI("img/Back-Select.png");
    img.height = drawImageHeight;
    img.id = "imgDraw";
    img.classList.add("imgInvocation");
    img.title = "Piocher une carte";
    img.draggable = false;
	
	img.setAttribute('title', "Piocher une carte d'invocation");
	img.addEventListener("click", showPopinInvocations);
	
	src.appendChild(img);
 }

function showPopinInvocations() {

	var who = "me";
	var currentPlayerId = document.getElementById("currentPlayerId").value;
	var oppPlayerId = Math.abs(1-currentPlayerId);
	
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

    fillHand(playerId);
}
