function fillHand(playerId, imageHeight) {

	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/hand", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);

	var src = document.getElementById("hand");
    src.innerHTML = '';

	for (var i = 0; i < cards.length; i++) {
		
		var domCard = new DomCard(cards[i], imageHeight);
		src.appendChild(domCard.divCard);
		
		domCard.divCard.appendChild(getHandCardButtons(cards[i]));
	}

}

function getHandCardButtons(card) {

    var divBlock = document.createElement("handCardButtonsDiv_" + card.id);
    divBlock.classList.add("divActionCard");

    var moveCardButton = document.createElement("button");
    moveCardButton.innerHTML = "&uArr;";
    moveCardButton.id = card.id;
    moveCardButton.classList.add("buttonActionCard");
    moveCardButton.setAttribute('onclick','moveCardToBoard(this.id);');
    divBlock.appendChild(moveCardButton);


    var moveTrapButton = document.createElement("button");
    moveTrapButton.innerHTML = "&rArr;";
    moveTrapButton.id = card.id;
    moveTrapButton.classList.add("buttonActionCard");
    moveTrapButton.setAttribute('onclick','moveCardToTrap(this.id);');
    divBlock.appendChild(moveTrapButton);


    var moveGrave = document.createElement("button");
    moveGrave.innerHTML = "&#9760;";
    moveGrave.id = card.id;
    moveGrave.classList.add("buttonActionCard");
    moveGrave.setAttribute('onclick','moveHandCardToGraveyard(this.id);');
    divBlock.appendChild(moveGrave);

    return divBlock;		

}

function moveCardToBoard(cardId){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)
}

function moveCardToTrap(cardId){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/trap/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)
}

function moveHandCardToGraveyard(cardId){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/hand-to-graveyard/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)
}
