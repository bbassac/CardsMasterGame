function fillTraps(playerId) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/traps", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);
    
    var src = document.getElementById("traps");
    src.innerHTML = '';

	 for (var i = 0; i < cards.length; i++){

	    var domCard = new DomCard(cards[i], trapImageHeight, CARD_DRAW_MODES_BOARD);
		src.appendChild(domCard.divCard);
		 
		var menu = [
			{ text: "Activer", action: (function() { moveCardFromTrapsToGraveyard(this); }).bind(domCard) },
			{ text: "Action 2", action: function() { alert("clique sur Action 2"); } },
			{ text: "Action 3", action: function() { alert("clique sur Action 3"); } }
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