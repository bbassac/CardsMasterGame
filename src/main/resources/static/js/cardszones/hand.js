class HandZone extends CardsZoneScrollableBoard {

	constructor() {
		super("hand", gameImageHeight, THEME_BLUE);
	}

	getCards(playerId) {

		var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+playerId+"/hand", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return JSON.parse(xhttp.responseText);
	}

	addSpecificCardElements(domCard) {
		
	    /*var menu = [
	        { text: MOVE_TO_BOARD, action: (function() { moveCardToBoard(this); }).bind(domCard) },
	        { text: MOVE_TO_TRAP, action: (function() { moveCardToTrap(this); }).bind(domCard) },
	        { text: MOVE_TO_EQUIPMENT, action: (function() { moveCardToEquipment(this); }).bind(domCard) },
	        { text: MOVE_TO_GRAVEYARD, action: (function() { moveHandCardToGraveyard(this); }).bind(domCard) },
	    ];
	
	    domCard.addMenu(menu);
	    */

		domCard.setDraggable(true);
	}
}