function fillBoardPlayer(playerId) {

	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/board", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);

	var src = document.getElementById("boardPlayer");
    src.innerHTML = '';

	for (var i = 0; i < cards.length; i++) {
		
		var domCard = new DomCard(cards[i], gameImageHeight, CARD_DRAW_MODES_BOARD);
		src.appendChild(domCard.divCard);
		
		addBoardCardButtons(domCard);
	}
}

function addBoardCardButtons(domCard) {

	var card = domCard.card;

    var divBlock = document.createElement("div");
    divBlock.id = "boardCardButtonsDiv_"+ card.id;
    divBlock.classList.add("divActionCard");
    domCard.divCard.appendChild(divBlock);

	// Remove damage button
    var buttonLessDmg = document.createElement("button");
    buttonLessDmg.innerHTML = "-";
    buttonLessDmg.classList.add("buttonActionCard");
    buttonLessDmg.addEventListener('click', (function() { changeDmgPoints(this, -1); }).bind(domCard) );
    divBlock.appendChild(buttonLessDmg);
    

	// Damage counter
    var divDamage = document.createElement("div");
    divDamage.id = "damage_" + card.id;
    divDamage.innerHTML = card.dammagePoints;
    divDamage.style.fontSize = "medium";
    divDamage.style.fontWeight = "bold";
    divDamage.style.width = "24px";
    divDamage.style.display = "inline-block";
    divDamage.style.textAlign = "center";
    divBlock.appendChild(divDamage);
    showDamage(domCard);


	// Add damage button
    var buttonMoreDmg = document.createElement("button");
    buttonMoreDmg.innerHTML = "+";
    buttonMoreDmg.classList.add("buttonActionCard");
    buttonMoreDmg.setAttribute("id",card.id);
    buttonMoreDmg.addEventListener('click', (function() { changeDmgPoints(this, 1); }).bind(domCard) );
    divBlock.appendChild(buttonMoreDmg);


    //Activate Button
    var flipButton = document.createElement("button");
    flipButton.id = "btnFlip_" + card.id;
	flipButton.classList.add("buttonActionCard");
    flipButton.addEventListener('click', (function() { flipCard(this); }).bind(domCard) );
    flipButton.style.marginLeft = "20px";
    divBlock.appendChild(flipButton);
    showCardActivation(domCard);


    //use button
    var useButton = document.createElement("button");
    useButton.innerHTML = "%";
    useButton.tag = card.used;
    useButton.classList.add("buttonActionCard");
    useButton.setAttribute("id",card.id);
    useButton.addEventListener('click', (function() { useCard(this); }).bind(domCard) );
    divBlock.appendChild(useButton);
    
    
    //Move button
    var moveCardButton = document.createElement("button");
    moveCardButton.innerHTML = "&#9760;";
    moveCardButton.setAttribute("id",card.id);
    moveCardButton.classList.add("buttonActionCard");
    moveCardButton.addEventListener('click', (function() { moveCardToGraveyard(this); }).bind(domCard) );
    divBlock.appendChild(moveCardButton);
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

function flipCard(domCard){

    var currentPlayerId = document.getElementById("currentPlayerId").value;
	var cardId = domCard.card.id;
	var isActivated = !domCard.getIsActivated();

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId+"/activated/"+isActivated, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

	domCard.setIsActivated(isActivated);

    showCardActivation(domCard);
}

function showCardActivation(domCard) {

	var card = domCard.card;
	var isActivated = domCard.getIsActivated();

	var flipButton = document.getElementById("btnFlip_" + card.id);
	flipButton.innerHTML = isActivated ? "&#8634" : "&#8631";

}

function useCard(domCard){

    var currentPlayerId = document.getElementById("currentPlayerId").value;
	var cardId = domCard.card.id;
	var isUsed = !domCard.getIsUsed();

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId+"/used/"+isUsed, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

	domCard.setIsUsed(isUsed);
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