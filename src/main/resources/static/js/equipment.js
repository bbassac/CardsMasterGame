function fillEquipments(playerId) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/equipments", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);
    

    var src = setAsBoardArea("equipments",THEME_GREY);
    setAsDropArea(src, equipmentAllowDrop, equipmentDrop);
    cleanArea(src);

	 for (var i = 0; i < cards.length; i++){
        var imgSize = cards.length > 7 ? equipmentHeight-10 : equipmentHeight;
	    var domCard = getDomCard(cards[i], imgSize, CARD_DRAW_MODES_BOARD);
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

function equipmentAllowDrop(fromDivId, toDivId, domCard) {
	return ((KIND_EQUIPMENT.localeCompare(domCard.card.metaData.kind) == 0)
			&& (fromDivId.localeCompare("hand_divCardsContainer") == 0));
}

function equipmentDrop(fromDivId, toDivId, domCard) {
	moveCardToEquipment(domCard);
}