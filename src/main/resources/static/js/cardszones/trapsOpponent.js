class TrapsOpponentZone extends CardsZoneBoard {

	constructor() {
		super("trapsOppId", trapImageHeight, THEME_RED);
	}

	getCards(playerId) {

	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+opponentPlayerId+"/traps", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return JSON.parse(xhttp.responseText);
	}

	addSpecificCardElements(domCard) {
	    domCard.setDraggable(true);
	    domCard.setBackImg("0-Back.jpg");
	}
	
	applySpecificCardProperties(domCard) {
		this.showUsedState(domCard);
	}
	
	showUsedState(domCard) {

		if (domCard.getStatus().used) {
			domCard.showFront();
		}
		else {
			domCard.showBack();
		}
	}
	
}