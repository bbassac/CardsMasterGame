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
		var activatedIcon = domCard.getStatus().activated ? IMG_ACTIVATE : IMG_DESACTIVATE;
	    var usedText = domCard.getStatus().used ? RESET_USE : USE;
	    var menu = [
	        { icon: activatedIcon,text: activatedText, action: (function(domCard, menuItem) { this.flipCard(domCard, menuItem); }).bind(this, domCard) },
	        { icon:IMG_POWER,text: usedText, action: (function(domCard, menuItem) { this.useCard(domCard, menuItem); }).bind(this, domCard) }
	    ];
	
	    domCard.addMenu(menu);
	    domCard.setDraggable(true);
	}
	
	applySpecificCardProperties(domCard) {
		this.showActivatedState(domCard);
		this.showUsedState(domCard);
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
	    
	    domCard.setMenuItem(menuItem, {icon:activated ? IMG_ACTIVATE : IMG_DESACTIVATE,text:activated ? RE_ACTIVATE : ACTIVATE});
	    
	    this.fill(currentPlayerId);
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
	    
	    domCard.setMenuItem(menuItem, {icon: IMG_POWER,text:used ? RESET_USE : USE});
	    
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