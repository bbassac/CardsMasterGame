function fillBoardPlayer(playerId) {

	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/board", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);

	var src = setAsBoardArea("boardPlayer");
    src.innerHTML = '';

	for (var i = 0; i < cards.length; i++) {
		
		var domCard = new DomCard(cards[i], gameImageHeight, CARD_DRAW_MODES_BOARD);
		src.appendChild(domCard.divCard);
		
		addBoardCardButtons(domCard);
        var activatedText = domCard.getIsActivated() ? RE_ACTIVATE : ACTIVATE;
        var usedText = domCard.getIsUsed()  ? RESET_USE : USE;
        var menu = [
            { text: activatedText, action: (function(menuItem) { flipCard(this,menuItem); }).bind(domCard) },
            { text: usedText, action: (function(menuItem) { useCard(this,menuItem); }).bind(domCard) },
            { text: MOVE_TO_GRAVEYARD, action: (function() { moveCardToGraveyard(this); }).bind(domCard) },
        ];

        domCard.addMenu(menu);
	}
}

function addBoardCardButtons(domCard) {

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
    buttonLessDmg.addEventListener('click', (function() { changeDmgPoints(this, -1); }).bind(domCard) );
    divDmgArea.appendChild(buttonLessDmg);

	// Damage counter
    var divDamage = document.createElement("div");
    divDamage.id = "damage_" + card.id;
    divDamage.innerHTML = card.dammagePoints;
    divDamage.classList.add("divDmg");
    divDmgArea.appendChild(divDamage);
    showDamage(domCard);

	// Add damage button
    var buttonMoreDmg = document.createElement("button");
    buttonMoreDmg.innerHTML = "+";
    buttonMoreDmg.classList.add("buttonActionCard");
    buttonMoreDmg.classList.add("plusDmgButton");
    buttonMoreDmg.setAttribute("id",card.id);
    buttonMoreDmg.addEventListener('click', (function() { changeDmgPoints(this, 1); }).bind(domCard) );
    divDmgArea.appendChild(buttonMoreDmg);

}

function changeDmgPoints(domCard, damageChange){

    var currentPlayerId = document.getElementById("currentPlayerId").value;
	var card = domCard.card;    
	var newDamageValue = card.dammagePoints + (damageChange ? damageChange : 0);

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/" + currentPlayerId + "/board/" + card.id + "/dmg/" + newDamageValue, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

	card.dammagePoints = newDamageValue;

	showDamage(domCard);
}

function showDamage(domCard) {

	var card = domCard.card;
	var divDamage = document.getElementById("damage_" + card.id);
	
	divDamage.innerHTML = card.dammagePoints;
	divDamage.style.color = (card.dammagePoints > 0) ? 'red' : 'black';
}

function flipCard(domCard,menuItem){

    var currentPlayerId = document.getElementById("currentPlayerId").value;
	var cardId = domCard.card.id;
	var isActivated = !domCard.getIsActivated();

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId+"/activated/"+isActivated, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

	domCard.setIsActivated(isActivated);

    showCardActivation(domCard,menuItem);
}

function showCardActivation(domCard,menuItem) {

	var card = domCard.card;
	var isActivated = domCard.getIsActivated();

	menuItem.setText(isActivated ? RE_ACTIVATE : ACTIVATE);
}

function useCard(domCard,menuItem){

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


function moveCardToGraveyard(domCard){
    
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var cardId = domCard.card.id;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/graveyard/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    domCard.remove();
    fillGraveyard(currentPlayerId, "graveyardId");
}