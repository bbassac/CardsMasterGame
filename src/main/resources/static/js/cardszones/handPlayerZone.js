class HandPlayerZone extends CardsZoneScrollableBoard {

	constructor() {
		super("hand", gameImageHeight, THEME_BLUE);
		this.setAutoScrollOnadd(true);
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
		this.showAffiniteEquipment(domCard);
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

		if("Arme"===(domCard.getMetaData().team) || ("Armure"===(domCard.getMetaData().team))) {
			var imgAffinite = document.createElement("img");
			imgAffinite.id = "imgAffinite_" + domCard.getId();
			imgAffinite.classList.add("imgAffinitePlayer");
			imgAffinite.title = EQUIPMENT_AFFINITE + domCard.getMetaData().chakra;
			imgAffinite.src = "img/affinite/" + domCard.getMetaData().chakra + ".png";
			divStatus.appendChild(imgAffinite);
		}
	}

	showAffiniteEquipment(domCard){
		if("Arme"===(domCard.getMetaData().team) || ("Armure"===(domCard.getMetaData().team))) {
			var img = document.getElementById("imgAffinite_" +  domCard.getId());
			var e = document.getElementById("divstatusArea_" +  domCard.getId());
			img.style.display="block";
			e.style.display="block";
		}
	}

	showStatusArea(domCard) {
		var e = document.getElementById("divstatusArea_" +  domCard.getId());
		if (!domCard.getStatus().hidden &&
			!domCard.getStatus().reinforced &&
			!domCard.getStatus().stuned){
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