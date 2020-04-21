function fillTraps(playerId) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/traps", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);
    
    var src = document.getElementById("traps");
    src.innerHTML = '';

	 for (var i = 0; i < cards.length; i++){
	
		var menu = [
			{ text: "Activer", action: (function() { moveCardFromTrapsToGraveyard(this); }).bind(cards[i]) },
			{ text: "Action 2", action: function() { alert("clique sur Action 2"); } },
			{ text: "Action 3", action: function() { alert("clique sur Action 3"); } }
		];
	
	    var domCard = new DomCard(cards[i], trapImageHeight, CARD_DRAW_MODES_BOARD);
		src.appendChild(domCard.divCard);
		domCard.addMenu(menu);
	}
}