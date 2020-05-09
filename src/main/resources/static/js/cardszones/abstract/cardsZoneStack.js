class CardsZoneStack extends CardsZone {
	
	constructor(divId, cardImgHeight) {
		super(divId, cardImgHeight, CARD_DRAW_MODES_STACK);
		
		this.oldCardId = -1;
	}

	fillCards(playerId, cards, forceUpdate) {

		var domCardDivs = this.getDivCardsContainer().childNodes;
		
	    if (cards.length == 0) {
	    	if (domCardDivs.length == 1) {
	    		// Si il n'y a plus de carte dans le cimetière on efface la pile cimetière si nécessaire
	    		this.removeCard(domCardDivs[0].domCard);
	    	}

	    }else if (forceUpdate || this.oldCardId !== cards[cards.length-1].id) {

	    	this.oldCardId = cards[cards.length-1].id
	    	
	    	if (domCardDivs.length == 1) {
	    		this.removeCard(domCardDivs[0].domCard);
	    	}

	    	this.addCard(cards[cards.length - 1]);
	    }
		
	}
}