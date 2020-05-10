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

	addSpecificCardElements(domCard) {
		this.addDamage(domCard);
		
	    domCard.divCard.addEventListener("activatedChanged", (function() {this.showActivatedState(domCard); }).bind(this))
	    domCard.divCard.addEventListener("usedChanged", (function() {this.showUsedState(domCard); }).bind(this))
	    domCard.divCard.addEventListener("damageChanged", (function() {this.showDamage(domCard); }).bind(this))		
	}
	
	applySpecificCardProperties(domCard) {
		this.showActivatedState(domCard);
		this.showUsedState(domCard);
		this.showDamage(domCard);
	}	
	
	addDamage(domCard) {

		//Je crée un sous-bloc pour l'affichage des dégats
		var divBlock = document.createElement("div");
		divBlock.id = "divOpponentDammage_" + domCard.getId();
		domCard.divCard.appendChild(divBlock);
		divBlock.style.textAlign = "center";
		
		var bold = document.createElement("b");
		var nbDmg = document.createTextNode("  " + domCard.getDamage() + "  ");
		bold.appendChild(nbDmg);
		bold.style.fontSize = "medium";
		if (domCard.getDamage() > 0){
		    bold.style.color = 'red';
		}
		
		//Ajout bloc dmg au div
		divBlock.appendChild(bold);

	}
	
	showActivatedState(domCard) {

		if (domCard.getActivated()) {
			domCard.cardImg.classList.add("activatedCard");
		} else {
			domCard.cardImg.classList.remove("activatedCard");
		}
	}

	showUsedState(domCard) {

		if (domCard.getUsed()) {
			domCard.cardImg.classList.add("usedCard");
		} else {
			domCard.cardImg.classList.remove("usedCard");
		}
	}

	showDamage(domCard) {
		
		var divDamage = document.getElementById("divOpponentDammage_" + domCard.getId());
		
		if (divDamage) {
			divDamage.innerHTML = domCard.getDamage();
			divDamage.style.color = (domCard.getDamage() > 0) ? 'red' : 'black';
		}
	}
}