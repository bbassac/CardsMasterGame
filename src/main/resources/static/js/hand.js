function fillHand(playerId) {

	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/hand", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);

	var src = document.getElementById("hand");
    src.innerHTML = '';

	for (var i = 0; i < cards.length; i++) {
		
		var domCard = new DomCard(cards[i], gameImageHeight, CARD_DRAW_MODES_BOARD);
		src.appendChild(domCard.divCard);
		
		addHandCardButtons(domCard);
	}
}

function addHandCardButtons(domCard) {

	var card = domCard.card;

    var divBlock = document.createElement("div");
    divBlock.id = "handCardButtonsDiv_" + card.id;
    divBlock.classList.add("divActionCard");
    domCard.divCard.appendChild(divBlock);

    var moveCardButton = document.createElement("button");
    moveCardButton.innerHTML = "&uArr;";
    moveCardButton.id = card.id;
    moveCardButton.classList.add("buttonActionCard");
    //moveCardButton.setAttribute('onclick','moveCardToBoard(this.id);');
    moveCardButton.addEventListener('click', (function() { moveCardToBoard(this); }).bind(domCard) );
    divBlock.appendChild(moveCardButton);


    var moveTrapButton = document.createElement("button");
    moveTrapButton.innerHTML = "&rArr;";
    moveTrapButton.id = card.id;
    moveTrapButton.classList.add("buttonActionCard");
    //moveTrapButton.setAttribute('onclick','moveCardToTrap(this.id);');
    moveTrapButton.addEventListener('click', (function() { moveCardToTrap(this); }).bind(domCard) );
    divBlock.appendChild(moveTrapButton);

    var moveEquipmentButton = document.createElement("button");
    moveEquipmentButton.innerHTML = "&dArr;";
    moveEquipmentButton.id = card.id;
    moveEquipmentButton.classList.add("buttonActionCard");
    moveEquipmentButton.addEventListener('click', (function() { moveCardToEquipment(this); }).bind(domCard) );
    divBlock.appendChild(moveEquipmentButton);


    var moveGrave = document.createElement("button");
    moveGrave.innerHTML = "&#9760;";
    moveGrave.id = card.id;
    moveGrave.classList.add("buttonActionCard");
    //moveGrave.setAttribute('onclick','moveHandCardToGraveyard(this.id);');
    moveGrave.addEventListener('click', (function() { moveHandCardToGraveyard(this); }).bind(domCard) );
    divBlock.appendChild(moveGrave);
}

function moveCardToBoard(domCard){
    
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var cardId = domCard.card.id;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    domCard.divCard.remove();
    fillBoardPlayer(currentPlayerId);
}

function moveCardToTrap(domCard){
    
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var cardId = domCard.card.id;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/trap/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    domCard.remove();
    fillTraps(currentPlayerId);
    fillHand(currentPlayerId);
}

function moveCardToEquipment(domCard){

    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var cardId = domCard.card.id;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/equipment/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

    domCard.remove();
    fillEquipments(currentPlayerId);
    fillHand(currentPlayerId);
}

function moveHandCardToGraveyard(domCard){
    
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var cardId = domCard.card.id;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/hand-to-graveyard/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    domCard.remove();
	fillGraveyard(currentPlayerId, "graveyardId");    
}
