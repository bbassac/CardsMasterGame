function fillEquipments(playerId) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/equipments", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);
    
    var src = document.getElementById("equipments");
    src.innerHTML = '';

	 for (var i = 0; i < cards.length; i++){
        var imgSize = cards.length > 7 ? equipmentHeight-10 : equipmentHeight;
	    var domCard = new DomCard(cards[i], imgSize, CARD_DRAW_MODES_BOARD);
		src.appendChild(domCard.divCard);
		 
		var menu = [
			{ text: MOVE_TO_GRAVEYARD, action: (function() { moveCardFromEquipmentsToGraveyard(this); }).bind(domCard) },
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
    //Pour le cas ou on doit les resize
    fillEquipments(currentPlayerId);
    
}