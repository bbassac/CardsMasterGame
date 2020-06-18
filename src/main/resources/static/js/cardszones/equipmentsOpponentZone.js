class EquipmentsOpponentZone extends CardsZoneScrollableBoard {

	constructor() {
		super("equipmentOppId", equipmentHeight, THEME_RED);
		this.setAutoScrollOnadd(true);
	}

	getCards(playerId) {

	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+opponentPlayerId+"/equipments", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return JSON.parse(xhttp.responseText);
	}

	addSpecificCardElements(domCard) {
	    domCard.setDraggable(true);
		this.addAffinite(domCard);
	}
	
	applySpecificCardProperties(domCard) {
		this.showActivatedState(domCard);
		this.showUsedState(domCard);
		this.showStatusArea(domCard);
		this.showAffiniteEquipment(domCard);
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

	addAffinite(domCard){

		var divStatus = document.createElement("div");
		divStatus.id = "divstatusArea_" + domCard.getId();
		divStatus.classList.add("divStatusPlayer");
		domCard.divBackImg.appendChild(divStatus);

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

		e.style.display="none";

	}
}