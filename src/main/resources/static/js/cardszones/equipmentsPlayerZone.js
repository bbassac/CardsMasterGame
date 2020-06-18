class EquipmentsPlayerZone extends CardsZoneScrollableBoard {

	constructor() {
		super("equipments", equipmentHeight, THEME_GREY);
		this.setAsDropZone();
	}

	getCards(playerId) {

	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+playerId+"/equipments", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return JSON.parse(xhttp.responseText);
	}

	addSpecificCardElements(domCard) {
		
	    var activatedText = domCard.getStatus().activated ? RE_ACTIVATE : ACTIVATE;
		var activatedIcon = domCard.getStatus().activated ? document.menuImgActivate : document.menuImgDesactivate;
	    var usedText = domCard.getStatus().used ? RESET_USE : USE;
	    var menu = [
	        { icon: activatedIcon,text: activatedText, action: (function(domCard, menuItem) { this.flipCard(domCard, menuItem); }).bind(this, domCard) },
	        { icon:document.menuImgPower,text: usedText, action: (function(domCard, menuItem) { this.useCard(domCard, menuItem); }).bind(this, domCard) }
	    ];
		this.setAutoScrollOnadd(true);
	    domCard.getMenu().addMenu(menu);
	    domCard.setDraggable(true);
		this.addAffinite(domCard);
	}
	
	applySpecificCardProperties(domCard) {
		this.showActivatedState(domCard);
		this.showUsedState(domCard);
		this.showStatusArea(domCard);
		this.showAffiniteEquipment(domCard);
	}
	
	allowDrop(fromZoneId, toZoneId, domCard) {
		
		var isEquipment = KIND_EQUIPMENT.localeCompare(domCard.getMetaData().kind) == 0;
		var isFromHand = fromZoneId.localeCompare(handZone.getZoneId()) == 0; 
		
		return isEquipment && isFromHand;
	}
	
	drop(fromZoneId, toZoneId, domCard) {
		this.moveCardFromHand(domCard);
	}
	
	flipCard(domCard, menuItem){
	
	    var activated = ! domCard.getStatus().activated;
		
		var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/equipment/"+domCard.getId()+"/activated/"+activated, false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    domCard.getMenu().setMenuItem(menuItem, {icon:activated ? document.menuImgActivate : document.menuImgDesactivate,text:activated ? RE_ACTIVATE : ACTIVATE});
	    
	    this.fill(currentPlayerId);
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
	
	showActivatedState(domCard) {

		if (domCard.getStatus().activated) {
			domCard.cardImg.classList.add("activatedCard");
		} else {
			domCard.cardImg.classList.remove("activatedCard");
		}
	}

	useCard(domCard, menuItem){
	
	    var used = ! domCard.getStatus().used;
	
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/equipment/"+domCard.getId()+"/used/"+used, false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    domCard.getMenu().setMenuItem(menuItem, {icon: document.menuImgPower,text:used ? RESET_USE : USE});
	    
	    this.fill(currentPlayerId);
	}

	showUsedState(domCard) {

		if (domCard.getStatus().used) {
			domCard.cardImg.classList.add("usedCard");
		} else {
			domCard.cardImg.classList.remove("usedCard");
		}
	}
	
	moveCardFromHand(domCard){
		
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "player/"+currentPlayerId+"/equipment/"+domCard.getId(), false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

        handZone.fill(currentPlayerId);
        this.fill(currentPlayerId);
	}

}