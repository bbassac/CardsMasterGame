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

	initDomCard(domCard) {
		
		this.addBoardCardButtons(domCard);
		
	    var activatedText = domCard.getIsActivated() ? RE_ACTIVATE : ACTIVATE;
	    var usedText = domCard.getIsUsed()  ? RESET_USE : USE;
	    var menu = [
	        { text: activatedText, action: (function(domCard, menuItem) { this.flipCard(domCard, menuItem); }).bind(this, domCard) },
	        { text: usedText, action: (function(domCard, menuItem) { this.useCard(domCard, menuItem); }).bind(this, domCard) },
	        { text: MOVE_TO_GRAVEYARD, action: (function(domCard) { this.moveCardToGraveyard(domCard); }).bind(this, domCard) },
	    ];
	
	    domCard.addMenu(menu);
	    domCard.setDraggable(true);
	    
		// ajout des listener des events used et activated de la nouvelle carte
		domCard.addEventListener("used", (function() { this.tryUpdateScrollArrows(0); }).bind(this))
		domCard.addEventListener("activated", (function() { this.tryUpdateScrollArrows(0); }).bind(this))

	}
	
	addBoardCardButtons(domCard) {
	
		var card = domCard.card;
	
	    //div de dmg
	    var divDmgArea = document.createElement("div");
	    divDmgArea.id = "divDmgArea_" + card.id;
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
	    divDamage.id = "damage_" + card.id;
	    divDamage.innerHTML = card.dammagePoints;
	    divDamage.classList.add("divDmg");
	    divDmgArea.appendChild(divDamage);
	    this.showDamage(domCard);
	
		// Add damage button
	    var buttonMoreDmg = document.createElement("button");
	    buttonMoreDmg.innerHTML = "+";
	    buttonMoreDmg.classList.add("buttonActionCard");
	    buttonMoreDmg.classList.add("plusDmgButton");
	    buttonMoreDmg.setAttribute("id",card.id);
	    buttonMoreDmg.addEventListener('click', (function(domCard) { this.changeDmgPoints(domCard, 1); }).bind(this, domCard) );
	    divDmgArea.appendChild(buttonMoreDmg);
	
	}
	
	changeDmgPoints(domCard, damageChange){
	
	    var currentPlayerId = document.getElementById("currentPlayerId").value;
		var card = domCard.card;    
		var newDamageValue = card.dammagePoints + (damageChange ? damageChange : 0);
	
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/" + currentPlayerId + "/board/" + card.id + "/dmg/" + newDamageValue, false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	
		card.dammagePoints = newDamageValue;
	
		this.showDamage(domCard);
	}
	
	showDamage(domCard) {
	
		var card = domCard.card;
		var divDamage = document.getElementById("damage_" + card.id);
		
		divDamage.innerHTML = card.dammagePoints;
		divDamage.style.color = (card.dammagePoints > 0) ? 'red' : 'black';
	}
	
	flipCard(domCard,menuItem){
	
	    var currentPlayerId = document.getElementById("currentPlayerId").value;
		var cardId = domCard.card.id;
		var isActivated = !domCard.getIsActivated();
	
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId+"/activated/"+isActivated, false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	
		domCard.setIsActivated(isActivated);
	
	    this.showCardActivation(domCard, menuItem);
	}
	
	showCardActivation(domCard, menuItem) {
		var card = domCard.card;
		var isActivated = domCard.getIsActivated();
	
		menuItem.setText(isActivated ? RE_ACTIVATE : ACTIVATE);
	}
	
	useCard(domCard,menuItem){
	
	    var currentPlayerId = document.getElementById("currentPlayerId").value;
		var cardId = domCard.card.id;
		var isUsed = !domCard.getIsUsed();
	
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId+"/used/"+isUsed, false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	
		domCard.setIsUsed(isUsed);
		
		menuItem.setText(isUsed? RESET_USE : USE);
	}
	
	
	allowDrop(fromZoneId, toZoneId, domCard) {
	
		/*return ((KIND_EQUIPMENT.localeCompare(domCard.card.metaData.kind) != 0)
				&& (KIND_TRAP.localeCompare(domCard.card.metaData.kind) != 0)
				&& (fromZoneId.localeCompare(handZone.getZoneId()) == 0));
		*/
		return ((KIND_TRAP.localeCompare(domCard.card.metaData.kind) != 0)
				&& (fromZoneId.localeCompare(handZone.getZoneId()) == 0));
	
	}
	
	drop(fromZoneId, toZoneId, domCard) {
		this.moveCardFromHandToBoardPlayer(domCard);
	}
	
	moveCardFromHandToBoardPlayer(domCard){
	    
	    var currentPlayerId = document.getElementById("currentPlayerId").value;
	
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+domCard.getId(), false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    handZone.fill(currentPlayerId);
	    boardPlayerZone.fill(currentPlayerId);
	}
}