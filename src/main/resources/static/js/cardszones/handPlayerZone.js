class HandPlayerZone extends CardsZoneScrollableBoard {

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
		domCard.setDraggable(true);
		this.addStatus(domCard);
	}

	applySpecificCardProperties(domCard) {
		this.showStatusArea(domCard);
		this.showStatusRenforced(domCard);
	}

	addStatus(domCard){

		var divStatus = document.createElement("div");
		divStatus.id = "divstatusArea_" + domCard.getId();
		divStatus.classList.add("divStatusPlayer");
		domCard.divBackImg.appendChild(divStatus);

		//manage renforced
		var imgRenforced = document.createElement("img");
		imgRenforced.id = "imgRenforcedOpp_" +  domCard.getId();
		imgRenforced.classList.add("imgRenforcedPlayer");
		imgRenforced.title = RENFORCED;
		divStatus.appendChild(imgRenforced);
	}

	showStatusArea(domCard) {
		var e = document.getElementById("divstatusArea_" +  domCard.getId());
		if (!domCard.getStatus().hidden && !domCard.getStatus().reinforced && !domCard.getStatus().stuned){
			e.style.display="none";
		}else{
			e.style.display="block";
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
}