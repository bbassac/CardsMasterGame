var dragDataDomCard = null;

function setAsDropArea(div, fctAllow, fctDrop) {
	
	div.ondragover = (function(event) { 

		var fromDiv = dragDataDomCard.divCardsContainer;
		
		if (fctAllow(fromDiv.id, this.id, dragDataDomCard)) {
			event.preventDefault();			
		}
		
	}).bind(div);
	
	
	div.ondrop = (function(event) {

		event.preventDefault();
		
		var fromDiv = dragDataDomCard.divCardsContainer;
		
		fctDrop(fromDiv.id, this.id, dragDataDomCard);
		
		dragDataDomCard.divCardsContainer = this;
		
		// nettoyage des données transitées
		event.dataTransfer.clearData();
		dragDataDomCard = null;
		
	}).bind(div);

	
	div.ondragend = (function(event) {
	}).bind(div);
	
}

function startDragDomCard(event, domCard) {
	dragDataDomCard = domCard;
}