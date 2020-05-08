function needAdd(card,slot){
    if (!slot){
        return true;
    }
    if (card.id != slot.domCard.card.id){
        return true;
    }
    return false;
}

function needDelete(card,slot){
    if (!slot){
        return false;
    }
    return card.id != slot.domCard.card.id;
}

function needUpdate(card,slot){
    if (!slot){
        return false;
    }

    if (card.id == slot.domCard.card.id){

        if (card.activated != slot.domCard.getIsActivated()) {
            return true;
        }

        if (card.used != slot.domCard.getIsUsed()){
            return true;
        }

        if (card.dammagePoints != slot.domCard.card.dammagePoints){
            return true;
        }
    }
    return false;

}

function cleanAllIfNeeded(cards, src) {
    
	if (cards.length != src.childNodes.length) {
		return true;

	} else {
		
		for (var i = 0; i < cards.length; i++) {
	
	        var indexedSlot = src.childNodes[i];
	
			if (cards.length != src.childNodes.length) {
				return true;
		
			}
	
	        if (needDelete(cards[i], indexedSlot)) {
	            return true;
	        } else if (needUpdate(cards[i], indexedSlot)) {
	        	return true;
	        }
	    }
	}    
}

function fillOpponentBoard(playerId){

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/board", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    //Ici j'ai toutes les cartes que je dois afficher
    var cards = JSON.parse(xhttp.responseText);
 
 
    //Je récupère le bloc contenant toutes les cartes
    var src = setAsBoardArea("boardOpp",THEME_RED);

    if (cleanAllIfNeeded(cards, src)) {

    	cleanArea(src);
    	
	    for (var i=0; i< cards.length;i++){
	
	        /*var indexedSlot = src.childNodes[i];
	
	        if (needDelete(cards[i], indexedSlot)){
	            console.log("Need Delete");
	            src.removeChild(indexedSlot);
	        }else if (needUpdate(cards[i], indexedSlot)){
	            console.log("Need Update");
	        }else if (needAdd(cards[i], indexedSlot)){
	        */
	        	addCardOnOpponentBoard(src, cards[i]);
	        //}
	    }
    }
}

function addCardOnOpponentBoard(src, card) {
	
	var domCard = getDomCard(card, opponentCardHeight, CARD_DRAW_MODES_BOARD);
	src.appendChild(domCard.divCard);
	
	addOpponentBoardCardInfos(domCard);
}

function addOpponentBoardCardInfos(domCard) {
	
	var card = domCard.card;
	
	//Je crée un sous-bloc pour l'affichage des dégats
	var divBlock = document.createElement("div");
	divBlock.id = "divOpponentDammage_" + domCard.getId();
	domCard.divCard.appendChild(divBlock);
	divBlock.style.textAlign = "center";
	
	var bold = document.createElement("b");
	var nbDmg = document.createTextNode("  " + card.dammagePoints + "  ");
	bold.appendChild(nbDmg);
	bold.style.fontSize = "medium";
	if (card.dammagePoints>0){
	    bold.style.color = 'red';
	}
	
	//Ajout bloc dmg au div
	divBlock.appendChild(bold);
}