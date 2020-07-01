class TrapsPlayerZone extends CardsZoneBoard {

	constructor() {
		super("traps", trapImageHeight);
		this.setAsDropZone();
	}

	getCards(playerId) {

	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+playerId+"/traps", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return JSON.parse(xhttp.responseText);
	}

	addSpecificCardElements(domCard) {
		domCard.setDraggable(true);
	}


    applySpecificCardProperties(domCard) {
    	this.setCardMenu(domCard);
        this.showUsedState(domCard);
    }

	allowDrop(fromZoneId, toZoneId, domCard) {
		
		var cardsLength = this.getDivCardsContainer().childNodes.length;
		
		var isTrap = KIND_TRAP.localeCompare(domCard.getMetaData().kind) == 0;
		var isFromHand = fromZoneId.localeCompare(handZone.getZoneId()) == 0; 
		
		return (cardsLength < 3) && isTrap && isFromHand;
	}

	drop(fromZoneId, toZoneId, domCard) {
		this.moveCardFromHandToTraps(domCard);
	}

	setCardMenu(domCard) {

        var usedText = domCard.getStatus().used ? RESET_TRAP : USE_TRAP;
        var menu = [

            { icon:document.menuImgPower, text: usedText, action: (function(domCard, menuItem) { this.useCard(domCard, menuItem); }).bind(this, domCard) },

        ];
        domCard.getMenu().setMenuItems(menu);
	}
	
    useCard(domCard, menuItem){

        var used = ! domCard.getStatus().used;

        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "player/"+currentPlayerId+"/trap/"+domCard.getId()+"/used/"+used, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

        domCard.getMenu().setMenuItem(menuItem, {icon: document.menuImgPower,text:used ? RESET_TRAP : USE_TRAP});

        this.fill(currentPlayerId);
    }

    showUsedState(domCard) {

        if (domCard.getStatus().used) {
            domCard.cardImg.classList.add("usedCard");
        } else {
            domCard.cardImg.classList.remove("usedCard");
        }
    }

	moveCardFromHandToTraps(domCard){
		
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/trap/"+domCard.getId(), false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    handZone.fill(currentPlayerId);
	    this.fill(currentPlayerId);
	}
}