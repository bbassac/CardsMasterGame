function fillBoardPlayer(playerId, imageHeight) {

	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/board", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);

	var src = document.getElementById("boardPlayer");
    src.innerHTML = '';

	for (var i = 0; i < cards.length; i++) {
		
		var domCard = new DomCard(cards[i], imageHeight);
		src.appendChild(domCard.divCard);
		
		domCard.divCard.appendChild(getBoardCardButtons(cards[i]));
	}
}

function getBoardCardButtons(card) {

    var div = document.createElement("boardCardButtonsDiv_-"+ card.id);
    div.classList.add("divActionCard");

	// Remove damage button
    var buttonLessDmg = document.createElement("button");
    buttonLessDmg.innerHTML = "-";
    buttonLessDmg.tag = parseInt(card.dammagePoints)-1;
    buttonLessDmg.setAttribute("id",card.id);
    buttonLessDmg.classList.add("buttonActionCard");
    buttonLessDmg.setAttribute('onclick','updateDmgPoints(this.id,this.tag);');
    div.appendChild(buttonLessDmg);
    

	// Damage counter
    var bold = document.createElement("b");
    var nbDmg = document.createTextNode("  " + card.dammagePoints+"  ");
    bold.style.fontSize = "medium";
    if (card.dammagePoints>0){
        bold.style.color = 'red';
    }
    bold.appendChild(nbDmg);
    div.appendChild(bold);


	// Add damage button
    var buttonMoreDmg = document.createElement("button");
    buttonMoreDmg.innerHTML = "+";
    buttonMoreDmg.tag = parseInt(card.dammagePoints)+1;
    buttonMoreDmg.classList.add("buttonActionCard");
    buttonMoreDmg.setAttribute("id",card.id);
    buttonMoreDmg.setAttribute('onclick','updateDmgPoints(this.id,this.tag);');
    div.appendChild(buttonMoreDmg);


    //Activate Button
    var flipButton = document.createElement("button");
    if (card.activated){
        flipButton.innerHTML = "&#8634";
    }else {
        flipButton.innerHTML = "&#8631";
    }
    flipButton.tag = card.activated;
    flipButton.setAttribute("id",card.id);
	flipButton.classList.add("buttonActionCard");
    flipButton.setAttribute('onclick','flipCard(this.id,this.tag);');
    flipButton.style.marginLeft = "20px";
    div.appendChild(flipButton)


    //use button
    var useButton = document.createElement("button");
    useButton.innerHTML = "%";
    useButton.tag = card.used;
    useButton.classList.add("buttonActionCard");
    useButton.setAttribute("id",card.id);
    useButton.setAttribute('onclick','useCard(this.id,this.tag);');
    div.appendChild(useButton)
    
    
    //Move button
    var moveCardButton = document.createElement("button");
    moveCardButton.innerHTML = "&#9760;";
    moveCardButton.setAttribute("id",card.id);
    moveCardButton.classList.add("buttonActionCard");
    moveCardButton.setAttribute('onclick','moveCardToGraveyard(this.id);');
    div.appendChild(moveCardButton);

    return div;
}

function updateDmgPoints(cardId, newDmgPoint){

    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId+"/dmg/"+newDmgPoint, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)

}

function flipCard(cardId,curentvalue){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId+"/activated/"+!curentvalue, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)
}

function useCard(cardId,curentvalue){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId+"/used/"+!curentvalue, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)
}

function moveCardToGraveyard(cardId){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/graveyard/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)
}

