class GraveyardCommonZone extends CardsZoneStack {

	constructor(graveyardId) {
		super(graveyardId, graveyardHeight);
		
		if (graveyardId == MY_GRAVEYARD_ID) {
			this.setAsDropZone();
    	}
	}

	getCards(playerId) {

		var graveyardPlayerId = (this.divId == MY_GRAVEYARD_ID) ? currentPlayerId : opponentPlayerId;

	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+graveyardPlayerId+"/graveyard", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return JSON.parse(xhttp.responseText);
	}

	addSpecificCardElements(domCard) {

		var who = this.divId == MY_GRAVEYARD_ID ? "me" : "you";
	    
		var menu = [
			{ icon: IMG_GRAVEYARD, text: "Afficher le cimetière", action: (function() { this.showPopinGrave(who); }).bind(this) },
		];
	    domCard.addMenu(menu);
	}

	allowDrop(fromZoneId, toZoneId, domCard) {
		return true;
	}

	drop(fromZoneId, toZoneId, domCard) {

		switch(fromZoneId) {
			case handZone.getZoneId() : 
				this.moveCardFromHandToGraveyard(domCard);
				break;
			case boardPlayerZone.getZoneId() : 
				this.moveCardFromBoardPlayerToGraveyard(domCard);
				break;
			case equipmentsZone.getZoneId() : 
				this.moveCardFromEquipmentsToGraveyard(domCard);
				break;
			case trapsZone.getZoneId() : 
				this.moveCardFromTrapsToGraveyard(domCard);
				break;
		}
	}


	
	showPopinGrave(who){
	
	    var xhttp = new XMLHttpRequest();
	    if(who=="me") {
	        xhttp.open("GET", "player/" + currentPlayerId + "/graveyard", false);
	    }else{
	        xhttp.open("GET", "player/" + opponentPlayerId + "/graveyard", false);
	    }
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    var cards = JSON.parse(xhttp.responseText);
	
		displayPopinSelectCard(who, cards, this.putCardFromGraveyardToPlayerBoard.bind(this), "url('img/Graveyard-2.png')");
	}
	
	putCardFromGraveyardToPlayerBoard(playerId, domCard, who) {
	
		if(who=="me"){
			this.addGraveyardCardToMe(playerId, domCard);
			this.fill(playerId);
		} else {
			this.addGraveyardCardToYou(playerId, domCard);	
			this.fill(playerId);
		}
	
		handZone.fill(playerId);
		hideCardSelectPopin();
	}
	
	/**
	 * Ajoute une carte d'un cimetière dans la main du joueur courant
	 */
	addGraveyardCardToMe(playerId, domCard) {
		
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "player/" + playerId + "/graveyard/" + domCard.getId(), false);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send();
		
	}
	
	/**
	 * Ajoute une carte d'un cimetière dans la main de l'adversaire du joueur courant
	 */
	addGraveyardCardToYou(playerId, domCard) {
		
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "opponent/" + opponentPlayerId + "/graveyard/" + domCard.getId() + "/player/" + currentPlayerId, false);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send();
		
	}
	
	moveCardFromBoardPlayerToGraveyard(domCard){
	    
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/graveyard/"+domCard.getId(), false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    boardPlayerZone.fill(currentPlayerId);
	    this.fill(currentPlayerId);
	}
	
	moveCardFromHandToGraveyard(domCard){
	    
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/hand-to-graveyard/"+domCard.getId(), false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    handZone.fill(currentPlayerId);
	    this.fill(currentPlayerId);
	}
	
	moveCardFromEquipmentsToGraveyard(domCard){
		
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/equipment/"+domCard.getId()+"/graveyard", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    equipmentsZone.fill(currentPlayerId);
	    this.fill(currentPlayerId);
	    
	}
	
	moveCardFromTrapsToGraveyard(domCard){
	
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/trap/"+domCard.getId()+"/graveyard", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    trapsZone.fill(currentPlayerId);
	    this.fill(currentPlayerId);
	    
	}
}