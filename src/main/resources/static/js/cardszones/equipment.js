class EquipmentsZone extends CardsZoneScrollableBoard {

	constructor() {
		super("equipments", equipmentHeight, THEME_GREY);
		this.setAsDropZone();
	}

	getCards(playerId) {

	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+playerId+"/equipments", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return JSON.parse(xhttp.responseText);
	}

	initDomCard(domCard) {
		domCard.setDraggable(true);
		
		// ajout des listener des events used et activated de la nouvelle carte
		domCard.addEventListener("used", (function() { this.tryUpdateScrollArrows(0); }).bind(this))
		domCard.addEventListener("activated", (function() { this.tryUpdateScrollArrows(0); }).bind(this))
	}
	
	allowDrop(fromZoneId, toZoneId, domCard) {
		return ((KIND_EQUIPMENT.localeCompare(domCard.card.metaData.kind) == 0)
				&& (fromZoneId.localeCompare(handZone.getZoneId()) == 0));
	}
	
	drop(fromZoneId, toZoneId, domCard) {
		this.moveCardFromHand(domCard);
	}
	
	moveCardFromHand(domCard){
		
        var currentPlayerId = document.getElementById("currentPlayerId").value;
        var cardId = domCard.card.id;

        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "player/"+currentPlayerId+"/equipment/"+cardId, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

        handZone.fill(currentPlayerId);
        equipmentsZone.fill(currentPlayerId);
	}

}