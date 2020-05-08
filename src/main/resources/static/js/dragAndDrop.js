function setAsDropArea(div, fctAllow, fctDrop) {
	
	div.ondragover = (function(event) { 

		var cardId = event.dataTransfer.getData("cardId");
		var fromDivId = event.dataTransfer.getData("divId");
		var domCard = getDomCardById(cardId);
		
		if (fctAllow(fromDivId, this.id, domCard)) {
			event.preventDefault();			
		}
	}).bind(div);
	
	
	div.ondrop = (function(event) {

		event.preventDefault();
		
		var cardId = event.dataTransfer.getData("cardId");
		var fromDivId = event.dataTransfer.getData("divId");
		var domCard = getDomCardById(cardId);
		
		fctDrop(fromDivId, this.id, domCard);
	}).bind(div);

}