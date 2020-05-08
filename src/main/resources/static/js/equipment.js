var equipmentsDivCardsContainer;

function fillEquipments(playerId) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/equipments", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);
    

    if (equipmentsDivCardsContainer == null) {
    	equipmentsDivCardsContainer = setAsBoardArea("equipments",THEME_GREY);
    	setAsDropArea(equipmentsDivCardsContainer, equipmentAllowDrop, equipmentDrop);
    }
    
    cleanArea(equipmentsDivCardsContainer);

	for (var i = 0; i < cards.length; i++){
	    addDomCardOnEquipments(cards[i]);
	}
}

function addDomCardOnEquipments(card) {
	
	if ((equipmentsDivCardsContainer != null) && (card != null)) {
		
		var domCard = getDomCard(card, equipmentHeight, CARD_DRAW_MODES_BOARD);
		equipmentsDivCardsContainer.appendChild(domCard.divCard);
		
		var menu = [
			{ text: MOVE_TO_GRAVEYARD, action: (function() { moveCardFromEquipmentsToGraveyard(this); }).bind(domCard) },
		];
	
		domCard.addMenu(menu);
		domCard.setDraggable(true);
	}
}

function moveCardFromEquipmentsToGraveyard(domCard){

    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/equipment/"+domCard.card.id+"/graveyard", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    domCard.remove();
    addDomCardOnGraveyard(currentPlayerId, domCard.card, "graveyardId");
    
}

function equipmentAllowDrop(fromDivId, toDivId, domCard) {
	return ((KIND_EQUIPMENT.localeCompare(domCard.card.metaData.kind) == 0)
			&& (fromDivId.localeCompare("hand_divCardsContainer") == 0));
}

function equipmentDrop(fromDivId, toDivId, domCard) {
	moveCardToEquipment(domCard);
}