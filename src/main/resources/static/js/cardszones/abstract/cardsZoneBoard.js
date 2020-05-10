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
		var newDomCardIndex;
		
		for (domCardIndex = 0; domCardIndex < domCardsPositions.length; domCardIndex++) {
			
			card = cards[domCardIndex];
			domCardPos = domCardsPositions[domCardIndex];
			newDomCardIndex = -1;
			
			if (domCardPos == null) {
				domCard = this.getNewDomCard(card);
				domCardPos = {domCard, domCardIndex};
				domCardsPositions[domCardIndex] = domCardPos;
				newDomCardIndex = domCardIndex;
			
			} else {
				
				domCard = domCardPos.domCard;
				
				if (domCardPos.index != domCardIndex) {
					domCardPos.index = domCardIndex;
					newDomCardIndex = domCardIndex;
				}
			}
			
			if (newDomCardIndex != -1) {
				domCard = this.insertDomCard(domCard, newDomCardIndex);
			} else {
				this.updateCardOnDomCard(card, domCard)
			}
		}

	}

}