class EnvironmentZone extends CardsZoneStack {

	constructor(graveyardId) {
		super("currentEnvironment", envAndAffinityHeight);
	}

	getCards(playerId) {

	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "stack/ENVIRONNEMENT", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return JSON.parse(xhttp.responseText);
	}
}