class CardsZoneBoard extends CardsZone {
	
	constructor(divId, cardImgHeight) {
		super(divId, cardImgHeight, CARD_DRAW_MODES_BOARD);
	}
	
	fillCards(playerId, cards) {
		
		var cardIndex = 0
		var domCardIndex = 0
		var domCardDivIndex = 0
		var domCardPositionFound;
		
		var card;
		var domCard;
		var domCardId;
		var domCardDivs = this.getDivCardsContainer().childNodes;
		var domCardsPositions = [];
		
		for (cardIndex = 0; cardIndex < cards.length; cardIndex++) {
			domCardsPositions[cardIndex] = null;
		}

		domCardDivIndex = 0
		while (domCardDivIndex < domCardDivs.length) {
		
			domCard = domCardDivs[domCardDivIndex].domCard;
			domCardId = domCard.getId();
			domCardPositionFound = false;
		
			for (cardIndex = 0; cardIndex < cards.length; cardIndex++) {
				
				if (domCardId == cards[cardIndex].id) {
					domCardsPositions[cardIndex] = {"domCard":domCard, "index":domCardDivIndex};
					domCardPositionFound = true;
					break;
				}
			}
			
			if (! domCardPositionFound) {
				this.removeCard(domCard);
			} else {
				domCardDivIndex++;
			}
		}
		
		var domCardPos = null;
		
		for (domCardIndex = 0; domCardIndex < domCardsPositions.length; domCardIndex++) {
			
			card = cards[domCardIndex];
			domCardPos = domCardsPositions[domCardIndex];
			
			if (domCardPos == null) {
				// nouvelle carte non présente sur le dom.
				
				domCard = this.getNewDomCard(card);
				domCardPos = {domCard, domCardIndex};
				domCardsPositions[domCardIndex] = domCardPos;
			
				domCard = this.insertDomCard(domCard, domCardIndex);
				
			} else if (domCardPos.index != domCardIndex) {
				// carte déjà présente sur le dom mais à la mauvaise place.
				
				domCardPos.index = domCardIndex;
				domCard.updateCard(card);
				domCard = this.insertDomCard(domCard, domCardIndex);
			
			} else {
				// carte déjà présente sur le dom à la bonne place.
				
				this.updateCardOnDomCard(card, domCardPos.domCard);
			}
		}
	}

}