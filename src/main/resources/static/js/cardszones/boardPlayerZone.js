class BoardPlayerZone extends CardsZoneScrollableBoard {
	
	constructor() {
		super("boardPlayer", gameImageHeight, THEME_GREEN);
		this.setAsDropZone();
	}

	getCards(playerId) {

		var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+playerId+"/board", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return JSON.parse(xhttp.responseText);
	}

	addSpecificCardElements(domCard) {
		
		this.addDamageButtons(domCard);
		
	    var activatedText = domCard.getStatus().activated ? RE_ACTIVATE : ACTIVATE;
	    var usedText = domCard.getStatus().used ? RESET_USE : USE;
	    var menu = [
	        { text: activatedText, action: (function(domCard, menuItem) { this.flipCard(domCard, menuItem); }).bind(this, domCard) },
	        { text: usedText, action: (function(domCard, menuItem) { this.useCard(domCard, menuItem); }).bind(this, domCard) }
	    ];
	
	    domCard.addMenu(menu);
	    domCard.setDraggable(true);
	}
	
	applySpecificCardProperties(domCard) {
		this.showActivatedState(domCard);
		this.showUsedState(domCard);
		this.showDamage(domCard);
	}

	allowDrop(fromZoneId, toZoneId, domCard) {
	
		var isEquipment = KIND_EQUIPMENT.localeCompare(domCard.getMetaData().kind) == 0;
		var isTrap = KIND_TRAP.localeCompare(domCard.getMetaData().kind) == 0;
		var isFromHand = fromZoneId.localeCompare(handZone.getZoneId()) == 0; 
		
		return isFromHand && !isTrap; // && !isEquipment;
	}
	
	drop(fromZoneId, toZoneId, domCard) {
		this.moveCardFromHandToBoardPlayer(domCard);
	}
	
	addDamageButtons(domCard) {
		
	    //div de dmg
	    var divDmgArea = document.createElement("div");
	    divDmgArea.id = "divDmgArea_" + domCard.getId();
	    divDmgArea.classList.add('dmgArea');
	    domCard.divBackImg.appendChild(divDmgArea);
	
		// Remove damage button
	    var buttonLessDmg = document.createElement("button");
	    buttonLessDmg.innerHTML = "-";
	    buttonLessDmg.classList.add("buttonActionCard");
	    buttonLessDmg.classList.add("minusDmgButton");
	    buttonLessDmg.addEventListener('click', (function(domCard) { this.changeDmgPoints(domCard, -1); }).bind(this, domCard) );
	    divDmgArea.appendChild(buttonLessDmg);
	
		// Damage counter
	    var divDamage = document.createElement("div");
	    divDamage.id = "damage_" + domCard.getId();
	    divDamage.classList.add("divDmg");
	    divDmgArea.appendChild(divDamage);
	    this.showDamage(domCard);

		// Add damage button
	    var buttonMoreDmg = document.createElement("button");
	    buttonMoreDmg.innerHTML = "+";
	    buttonMoreDmg.classList.add("buttonActionCard");
	    buttonMoreDmg.classList.add("plusDmgButton");
	    buttonMoreDmg.setAttribute("id",domCard.getId());
	    buttonMoreDmg.addEventListener('click', (function(domCard) { this.changeDmgPoints(domCard, 1); }).bind(this, domCard) );
	    divDmgArea.appendChild(buttonMoreDmg);
	}
	
	changeDmgPoints(domCard, damageChange){
	
	    var damage = domCard.getDamage() + damageChange;
	    
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/" + currentPlayerId + "/board/" + domCard.getId() + "/dmg/" + damage, false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    this.fill(currentPlayerId);
	}
	
	showDamage(domCard) {
		
		var divDamage = document.getElementById("damage_" + domCard.getId());

		if (divDamage) {
			divDamage.innerHTML = domCard.getDamage();
			divDamage.style.color = (domCard.getDamage() > 0) ? 'red' : 'black';
		}
	}
	
	flipCard(domCard, menuItem){
	
	    var activated = ! domCard.getStatus().activated;
		
		var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+domCard.getId()+"/activated/"+activated, false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    domCard.setMenuItemText(menuItem, activated ? RE_ACTIVATE : ACTIVATE); 
	    
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
	    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+domCard.getId()+"/used/"+used, false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    domCard.setMenuItemText(menuItem, used ? RESET_USE : USE);
	    
	    this.fill(currentPlayerId);
	}

	showUsedState(domCard) {

		if (domCard.getStatus().used) {
			domCard.cardImg.classList.add("usedCard");
		} else {
			domCard.cardImg.classList.remove("usedCard");
		}
	}

	moveCardFromHandToBoardPlayer(domCard){
	    
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+domCard.getId(), false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    handZone.fill(currentPlayerId);
	    this.fill(currentPlayerId);
	}
}