/**
 * class cardsZone.
 * 
 * Représente une zone de cartes.
 * 
 * Ne doit pas être instanciée.
 * 
 */

// variable static : données (domCard) trasitées lors d'un drag-and-drop entre zones
var dragDataDomCard;

class CardsZone {

	constructor(divId, cardImgHeight, drawMode) {

		this.divId = divId;
		this.zoneId = divId + "_zone";
		this.divCardsContainer = document.getElementById(divId);
		
		this.cardImgHeight = cardImgHeight;
		this.drawMode = drawMode
		
		this.cardsLength = 0;
	}

	getZoneId() {
		return this.zoneId;
	}
	
	fillCards(playerId, cards) {
	}

	getCards(playerId) {
		return [];
	}
	
	domCardAdded(domCard, position) {
	}
	
	domCardUpdated(domCard) {
	}
	
	domCardRemoved(domCard) {
	}
	
	addSpecificCardElements(domCard) {
	}

	applySpecificCardProperties(domCard) {
	}
	
	fill(playerId) {
		this.fillCards(playerId, this.getCards(playerId));
	}
	
	setAsDropZone() {
		
		this.getDivCardsContainer().ondragover = (function(event) { 

			var fromZoneId = dragDataDomCard.getZone().getZoneId();
			
			if (this.allowDrop(fromZoneId, this.getZoneId(), dragDataDomCard)) {
				event.preventDefault();			
			}
			
		}).bind(this);
		
		
		this.getDivCardsContainer().ondrop = (function(event) {

			event.preventDefault();
			
			var fromZoneId = dragDataDomCard.getZone().getZoneId();
			
			this.drop(fromZoneId, this.getZoneId(), dragDataDomCard);
			
			// nettoyage des données transitées
			event.dataTransfer.clearData();
			dragDataDomCard = null;
			
		}).bind(this);

		
		this.divCardsContainer.ondragend = (function(event) {
		}).bind(this);
		
	}
	
	allowDrop(fromZoneId, toZoneId, domCard) {
		return false;
	}
	
	drop(fromZoneId, toZoneId, domCard) {
	}	
	
	startDragDomCard(event, domCard) {
		dragDataDomCard = domCard;
	}
	
	/**
	 * @returns Le div où devront être ajoutées les cartes sur le composant scrollable.
	 */
	getDivCardsContainer() {
		 return this.divCardsContainer;
	 }
	
	/**
	 * construit un domCard à partir d'un card
	 * 
	 * @param card : card à ajouter
	 */
	getNewDomCard(card) {
		return new DomCard(card, this.cardImgHeight, this.drawMode);
	}

	
	/**
	 * construit un domCard à partir d'un card, set les attributs d'association à la zone et
	 * ajoute de domCard au div contenant les cartes.
	 * 
	 * @param card : card à ajouter
	 */
	addCard(card) {
		return this.addDomCard(this.getNewDomCard(card));
	}
	
	/**
	 * Set les attributs d'association à la zone au domCard et l'ajoute de domCard au div contenant les cartes.
	 * 
	 * @param domCard : domCard à ajouter
	 */
	addDomCard(domCard) {		

		var position = this.divCardsContainer.childNodes.length;
		
		domCard.divCardsContainer = this.divCardsContainer;
		domCard.setZone(this);

		this.addSpecificCardElements(domCard);
		this.divCardsContainer.appendChild(domCard.divCard);		

		this.applySpecificCardProperties(domCard);
		
		this.domCardUpdated(domCard);
		this.domCardAdded(domCard, position);
		
		return domCard;
	}

	/**
	 * Set les attributs d'association à la zone au domCard et l'insère au div contenant 
	 * les cartes à la position indiquée.
	 * 
	 * @param domCard: domCard à ajouter
	 * @param position: position d'insertion de la carte
	 */
	insertDomCard(domCard, position) {

		var parentDiv = this.getDivCardsContainer();
		
		if (position > parentDiv.childNodes.length) {
			position = parentDiv.childNodes.length - 1;
		}
		
		if (position < 0) {
			position = 0;
		}
		
		domCard.divCardsContainer = this.divCardsContainer;
		domCard.setZone(this);

		this.addSpecificCardElements(domCard);
		
		if (position == 0 ) {
			parentDiv.insertAdjacentElement('afterbegin', domCard.divCard);
		} else  {
			var previousCardDiv = parentDiv.childNodes[position - 1].domCard.divCard; 
			previousCardDiv.insertAdjacentElement('afterend', domCard.divCard);
		}

		this.applySpecificCardProperties(domCard);
		
		this.domCardUpdated(domCard);
		this.domCardAdded(domCard, position);
		
		return domCard;
	}
	
	updateCardOnDomCard(card, domCard) {
		domCard.updateCard(card);
		this.applySpecificCardProperties(domCard);
		
		this.domCardUpdated(domCard);
		
		return domCard;
	}
	
	removeCard(domCard) {
		domCard.divCardsContainer = null;
		domCard.setZone(null);
		domCard.divCard.remove();
		this.domCardRemoved(domCard);
	}
}