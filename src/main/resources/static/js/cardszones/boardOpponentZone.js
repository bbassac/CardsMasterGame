class BoardOpponentZone extends CardsZoneScrollableBoard {

	constructor() {
		super("boardOpp", opponentCardHeight, THEME_RED);
	}

	getCards(playerId) {

	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+opponentPlayerId+"/board", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    return JSON.parse(xhttp.responseText);
	}

	addSpecificCardElements(domCard) {
		this.addDamage(domCard);
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

		if (domCard.getStatus().activated) {
			domCard.cardImg.classList.add("activatedCard");
		} else {
			domCard.cardImg.classList.remove("activatedCard");
		}
	}

	showUsedState(domCard) {

		if (domCard.getStatus().used) {
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