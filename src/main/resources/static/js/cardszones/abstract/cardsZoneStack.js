class CardsZoneStack extends CardsZone {
	
	constructor(divId, cardImgHeight) {
		super(divId, cardImgHeight, CARD_DRAW_MODES_STACK);
		
		this.oldCardId = -1;
	}

	fillCards(playerId, cards) {

		var domCardDivs = this.getDivCardsContainer().childNodes;
		
	    if (cards.length == 0) {
	    	if (domCardDivs.length == 1) {
	    		// Si il n'y a plus de carte dans le cimetière on efface la pile cimetière si nécessaire
	    		this.removeCard(domCardDivs[0].domCard);
	    	}

	    	this.oldCardId = -1;

	    }else {
	    	
	    	var domCard;
	    	var lastCard = cards[cards.length-1];
	    	
	    	if (this.oldCardId !== lastCard.id) {

		    	this.oldCardId = lastCard.id
		    	
		    	if (domCardDivs.length == 1) {
		    		this.removeCard(domCardDivs[0].domCard);
		    	}
	
		    	domCard = this.addCard(lastCard);
	    	
	    	} else {
	    		this.updateCardOnDomCard(lastCard, domCardDivs[0].domCard);
	    	}
	    }
		
	}
}