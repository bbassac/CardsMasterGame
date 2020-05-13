class AffiniteZone extends CardsZoneStack {

	constructor() {
		super("affiniteId", envAndAffinityHeight);
	}

	getCards(playerId) {

	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+playerId+"/affinite", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return [JSON.parse(xhttp.responseText)];
	}
}