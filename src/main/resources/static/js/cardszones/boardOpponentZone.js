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
		this.setAutoScrollOnadd(true);
		this.addDamage(domCard);
		this.addStatus(domCard);
	}
	
	applySpecificCardProperties(domCard) {
		this.showActivatedState(domCard);
		this.showUsedState(domCard);
		this.showDamage(domCard);
		this.showStatusHidden(domCard);
		this.showStatusStuned(domCard);
		this.showStatusRenforced(domCard);
		//PENSE BETE
		//console.log(domCard.cardImg.getBoundingClientRect());
	}	

	addStatus(domCard){
		
		var divStatus = document.createElement("div");
		divStatus.id = "divstatusOppArea_" + domCard.getId();
		divStatus.classList.add("divStatusOpponent");
		domCard.divBackImg.appendChild(divStatus);

		//manage hidden
		var imgHidden = document.createElement("img");
		imgHidden.id = "imgHiddenOpp_" +  domCard.getId();
		imgHidden.classList.add("imgHiddenOpponent");
		imgHidden.title = HIDDEN;
		divStatus.appendChild(imgHidden);

		//manage stuned
		var imgStuned = document.createElement("img");
		imgStuned.id = "imgStunedOpp_" +  domCard.getId();
		imgStuned.classList.add("imgStunedOpponent");
		imgStuned.title = STUNED;
		divStatus.appendChild(imgStuned);

		//manage renforced
		var imgRenforced = document.createElement("img");
		imgRenforced.id = "imgRenforcedOpp_" +  domCard.getId();
		imgRenforced.classList.add("imgRenforcedOpponent");
		imgRenforced.title = RENFORCED;
		divStatus.appendChild(imgRenforced);
	}

	showStatusHidden(domCard){

		var e = document.getElementById("imgHiddenOpp_" +  domCard.getId());
		//manage hidden
		if (domCard.getStatus().hidden) {
			e.style.display="block";
		}else{
			e.style.display="none";
		}

	}

	showStatusRenforced(domCard){

		var e = document.getElementById("imgRenforcedOpp_" +  domCard.getId());
		//manage hidden
		if (domCard.getStatus().reinforced) {
			e.style.display="block";
		}else{
			e.style.display="none";
		}

	}

	showStatusStuned(domCard){

		var e = document.getElementById("imgStunedOpp_" +  domCard.getId());
		//manage hidden
		if (domCard.getStatus().stuned) {
			e.style.display="block";
		}else{
			e.style.display="none";
		}

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

	}
	
	showActivatedState(domCard) {
		
		var divStatus = document.getElementById("divstatusOppArea_" + domCard.getId());
		var divDamage = document.getElementById("divDmgOppArea_" + domCard.getId());
		
		if (domCard.getStatus().activated) {
			domCard.cardImg.classList.add("activatedCard");
			divStatus.classList.add("statusAreaOpponentTurned");
			divDamage.classList.add("dmgAreaOpponentTurned");
		} else {
			domCard.cardImg.classList.remove("activatedCard");
			divStatus.classList.remove("statusAreaOpponentTurned");
			divDamage.classList.remove("dmgAreaOpponentTurned");
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