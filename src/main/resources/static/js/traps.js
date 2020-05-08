function fillTraps(playerId) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/traps", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);
    
    var src = document.getElementById("traps");
    src.innerHTML = '';

	 for (var i = 0; i < cards.length; i++){

	    var domCard = getDomCard(cards[i], trapImageHeight, CARD_DRAW_MODES_BOARD);
		src.appendChild(domCard.divCard);
		 
		var menu = [
			{ text: MOVE_TO_GRAVEYARD, action: (function() { moveCardFromTrapsToGraveyard(this); }).bind(domCard) },
		];
	
		domCard.addMenu(menu);
	}
}

function moveCardFromTrapsToGraveyard(domCard){

    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/trap/"+domCard.card.id+"/graveyard", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    fillGraveyard(currentPlayerId, "graveyardId");
    domCard.remove();
    
}