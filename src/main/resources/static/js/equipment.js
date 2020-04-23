function fillEquipments(playerId) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/equipments", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);
    
    var src = document.getElementById("equipments");
    src.innerHTML = '';

	 for (var i = 0; i < cards.length; i++){

	    var domCard = new DomCard(cards[i], trapImageHeight-10, CARD_DRAW_MODES_BOARD);
		src.appendChild(domCard.divCard);
		 
		var menu = [
			{ text: "Envoyer au cimetière", action: (function() { moveCardFromEquipmentsToGraveyard(this); }).bind(domCard) },
		];
	
		domCard.addMenu(menu);
	}
}

function moveCardFromEquipmentsToGraveyard(domCard){

    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/equipment/"+domCard.card.id+"/graveyard", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    fillGraveyard(currentPlayerId, "graveyardId");
    domCard.remove();
    
}