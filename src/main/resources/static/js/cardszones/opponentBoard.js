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

		//div de dmg
		var divDmgArea = document.createElement("div");
		divDmgArea.id = "divDmgOppArea_" + domCard.getId();
		divDmgArea.classList.add('dmgArea');
		domCard.divBackImg.appendChild(divDmgArea);

		// Damage counter
		var divDamage = document.createElement("div");
		divDamage.id = "divOpponentDammage_" + domCard.getId();
		divDamage.classList.add("divDmg");
		divDmgArea.appendChild(divDamage);
		this.showDamage(domCard);

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