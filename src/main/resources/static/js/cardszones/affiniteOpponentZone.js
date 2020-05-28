class AffiniteOpponentZone extends CardsZoneStack {

	constructor() {
		super("affiniteOppId", envAndAffinityHeight);
	}

	getCards(playerId) {

	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+opponentPlayerId+"/affinite", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return [JSON.parse(xhttp.responseText)];
	}
}