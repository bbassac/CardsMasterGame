class TrapsPlayerZone extends CardsZoneBoard {

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
		
		var isTrap = KIND_TRAP.localeCompare(domCard.getMetaData().kind) == 0;
		var isFromHand = fromZoneId.localeCompare(handZone.getZoneId()) == 0; 
		
		return (cardsLength < 3) && isTrap && isFromHand;
	}

	drop(fromZoneId, toZoneId, domCard) {
		this.moveCardFromHandToTraps(domCard);
	}

	moveCardFromHandToTraps(domCard){
		
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/trap/"+domCard.getId(), false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    handZone.fill(currentPlayerId);
	    trapsZone.fill(currentPlayerId);
	}
}