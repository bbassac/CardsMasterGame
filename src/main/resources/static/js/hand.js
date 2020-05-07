function fillHand(playerId) {

	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/hand", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);

	var src = setAsBoardArea("hand");
	cleanArea(src);

	for (var i = 0; i < cards.length; i++) {
		
		var domCard = new DomCard(cards[i], gameImageHeight, CARD_DRAW_MODES_BOARD);
		src.appendChild(domCard.divCard);
        
        var menu = [
            { text: MOVE_TO_BOARD, action: (function() { moveCardToBoard(this); }).bind(domCard) },
            { text: MOVE_TO_TRAP, action: (function() { moveCardToTrap(this); }).bind(domCard) },
            { text: MOVE_TO_EQUIPMENT, action: (function() { moveCardToEquipment(this); }).bind(domCard) },
            { text: MOVE_TO_GRAVEYARD, action: (function() { moveHandCardToGraveyard(this); }).bind(domCard) },
        ];
    
        domCard.addMenu(menu);
    }
    
  
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
    if ( domCard.card.metaData.kind == KIND_TRAP){
        var currentPlayerId = document.getElementById("currentPlayerId").value;
        var cardId = domCard.card.id;

        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "player/"+currentPlayerId+"/trap/"+cardId, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        
        domCard.remove();
        fillTraps(currentPlayerId);
        fillHand(currentPlayerId);
    }else {
        alert(ERROR_TRAP);
    }
}

function moveCardToEquipment(domCard){
    if ( domCard.card.metaData.kind == KIND_EQUIPMENT){
        var currentPlayerId = document.getElementById("currentPlayerId").value;
        var cardId = domCard.card.id;

        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "player/"+currentPlayerId+"/equipment/"+cardId, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

        domCard.remove();
        fillEquipments(currentPlayerId);
        fillHand(currentPlayerId);
    }else{
        alert(ERROR_EQUIPMENT);
    }
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
