class TrapsZone extends CardsZoneBoard {

	constructor() {
		super("traps", trapImageHeight);
		this.setAsDropZone();
	}

	getCards(playerId) {

	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+playerId+"/traps", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return JSON.parse(xhttp.responseText);
	}

	addSpecificCardElements(domCard) {
		domCard.setDraggable(true);
	}

	allowDrop(fromZoneId, toZoneId, domCard) {
		
		var cardsLength = this.getDivCardsContainer().childNodes.length;
		
		return ((cardsLength < 3)
				&& (KIND_TRAP.localeCompare(domCard.getMetaData().kind) == 0)
				&& (fromZoneId.localeCompare(handZone.getZoneId()) == 0));
	}

	drop(fromZoneId, toZoneId, domCard) {
		this.moveCardFromHandToTraps(domCard);
	}

	moveCardFromHandToTraps(domCard){
		
	    var currentPlayerId = document.getElementById("currentPlayerId").value;
	
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/trap/"+domCard.getId(), false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    handZone.fill(currentPlayerId);
	    trapsZone.fill(currentPlayerId);
	}
}