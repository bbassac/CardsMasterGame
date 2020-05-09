class OpponentBoardPlayerZone extends CardsZoneScrollableBoard {

	constructor() {
		super("boardOpp", opponentCardHeight, THEME_RED);
	}

	getCards(playerId) {

		var oppPlayerId = Math.abs(1-playerId);
		
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+oppPlayerId+"/board", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return JSON.parse(xhttp.responseText);
	}

	initDomCard(domCard) {
		
		var card = domCard.card;
		
		//Je crée un sous-bloc pour l'affichage des dégats
		var divBlock = document.createElement("div");
		divBlock.id = "divOpponentDammage_" + domCard.getId();
		domCard.divCard.appendChild(divBlock);
		divBlock.style.textAlign = "center";
		
		var bold = document.createElement("b");
		var nbDmg = document.createTextNode("  " + card.dammagePoints + "  ");
		bold.appendChild(nbDmg);
		bold.style.fontSize = "medium";
		if (card.dammagePoints>0){
		    bold.style.color = 'red';
		}
		
		//Ajout bloc dmg au div
		divBlock.appendChild(bold);

	}
}