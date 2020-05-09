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
	
	getCards(playerId) {
		return [];
	}
	
	domCardAdded(domCard) {
	}
	
	domCardRemoved(domCard) {
	}
	
	initDomCard(domCard) {
	}

	fillCards(playerId, cards) {
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
	getDomCard(card) {
		return getDomCardInCache(card, this.cardImgHeight, this.drawMode);
	}

	
	/**
	 * construit un domCard à partir d'un card, set les attributs d'association à la zone et
	 * ajoute de domCard au div contenant les cartes.
	 * 
	 * @param card : card à ajouter
	 */
	addCard(card) {
		this.addDomCard(this.getDomCard(card));
	}
	
	/**
	 * Set les attributs d'association à la zone au domCard et l'ajoute de domCard au div contenant les cartes.
	 * 
	 * @param domCard : domCard à ajouter
	 */
	addDomCard(domCard) {		

		domCard.divCardsContainer = this.divCardsContainer;
		domCard.setZone(this);
		this.divCardsContainer.appendChild(domCard.divCard);
		
		this.domCardAdded(domCard);
		this.initDomCard(domCard);
		
		return domCard;
	}

	/**
	 * Set les attributs d'association à la zone au domCard et l'insère au div contenant 
	 * les cartes, à la position indisquée.
	 * 
	 * @param domCard : domCard à ajouter
	 */
	insertDomCard(domCard, position) {

		var parentDiv = this.getDivCardsContainer();
		
		if (position >= parentDiv.childNodes.length) {
			position = parentDiv.childNodes.length - 1;
		}
		
		if (position < 0) {
			position = 0;
		}
		
		if (position == 0 ) {
			parentDiv.insertAdjacentElement('afterbegin', domCard.divCard);
		} else  {
			var previousCardDiv = parentDiv.childNodes[position - 1].domCard.divCard; 
			previousCardDiv.insertAdjacentElement('afterend', domCard.divCard);
		}

		domCard.divCardsContainer = this.divCardsContainer;
		domCard.setZone(this);
		this.divCardsContainer.appendChild(domCard.divCard);
		
		this.domCardAdded(domCard);
		this.initDomCard(domCard);			
		
		return domCard;
	}	
	
	removeCard(domCard) {
		domCard.divCardsContainer = null;
		domCard.divCard.remove();
		this.domCardRemoved(domCard);
	}
}