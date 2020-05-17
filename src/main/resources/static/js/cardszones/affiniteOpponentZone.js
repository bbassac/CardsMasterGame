class AffiniteOpponentZone extends CardsZoneStack {

	constructor() {
		super("affiniteOppId", trapImageHeight);
	}

	getCards(playerId) {

		var oppPlayerId = Math.abs(1-playerId);

	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+oppPlayerId+"/affinite", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return [JSON.parse(xhttp.responseText)];
	}
}