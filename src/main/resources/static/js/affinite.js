function fillAffinite() {

    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var currentOppId = Math.abs(1-currentPlayerId);

    displayAffinite(currentPlayerId, "affiniteId", drawImageHeight);
    displayAffinite(currentOppId, "affiniteOppId", trapImageHeight);
}

function displayAffinite(playerId, srcId, cardHeight) {

    //affinite
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/affinite", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var card = JSON.parse(xhttp.responseText);
    
    var src = document.getElementById(srcId);
    src.innerHTML = '';
    
	var domCard = new DomCard(card, cardHeight, CARD_DRAW_MODES_DICE);
	src.appendChild(domCard.divCard);
}