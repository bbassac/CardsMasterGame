const MY_GRAVEYARD_ID = "graveyardId";
const OPP_GRAVEYARD_ID = "graveyardOppId";

const graveyardsId = [[MY_GRAVEYARD_ID, OPP_GRAVEYARD_ID], [OPP_GRAVEYARD_ID, MY_GRAVEYARD_ID]];

class GraveyardZone extends CardsZoneStack {

	constructor(graveyardId) {
		super(graveyardId, graveyardHeight);
		
		if (graveyardId == MY_GRAVEYARD_ID) {
			this.setAsDropZone();
    	}
	}

	getCards(playerId) {

		var graveyardPlayerId = (this.divId == MY_GRAVEYARD_ID) ? playerId : playerId = Math.abs(1-playerId);

	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+graveyardPlayerId+"/graveyard", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return JSON.parse(xhttp.responseText);
	}

	initDomCard(domCard) {

		var who = this.divId == MY_GRAVEYARD_ID ? "me" : "you";
	    
		var menu = [
			{ text: "Afficher le cimetière", action: (function() { this.showPopinGrave(who); }).bind(this) },
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
	
	    var currentPlayerId = document.getElementById("currentPlayerId").value;
	    var oppPlayerId = Math.abs(1-currentPlayerId);
	
	    var xhttp = new XMLHttpRequest();
	    if(who=="me") {
	        xhttp.open("GET", "player/" + currentPlayerId + "/graveyard", false);
	    }else{
	        xhttp.open("GET", "player/" + oppPlayerId + "/graveyard", false);
	    }
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    var cards = JSON.parse(xhttp.responseText);
	
		displayPopinSelectCard(who, cards, this.putCardFromGraveyardToPlayerBoard.bind(this), "url('img/Graveyard-2.png')");
	}
	
	putCardFromGraveyardToPlayerBoard(playerId, card, who) {
	
		if(who=="me"){
			this.addGraveyardCardToMe(playerId, card);
			graveyardZones.MY_GRAVEYARD_ID.fill(playerId);
		} else {
			addGraveyardCardToYou(playerId, card);	
			graveyardZones.OPP_GRAVEYARD_ID.fill(playerId);
		}
	
		handZone.fill(playerId);
		hideCardSelectPopin();
	}
	
	/**
	 * Ajoute une carte d'un cimetière dans la main du joueur courant
	 */
	addGraveyardCardToMe(playerId, card) {
		
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "player/" + playerId + "/graveyard/" + card.id, false);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send();
		
	}
	
	/**
	 * Ajoute une carte d'un cimetière dans la main de l'adversaire du joueur courant
	 */
	addGraveyardCardToYou(playerId, card) {
		
		var oppPlayerId = Math.abs(1-playerId);
		
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "opponent/" + oppPlayerId + "/graveyard/" + card.id + "/player/" + playerId, false);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send();
		
	}
	
	moveCardFromBoardPlayerToGraveyard(domCard){
	    
	    var currentPlayerId = document.getElementById("currentPlayerId").value;
	
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/graveyard/"+domCard.getId(), false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    boardPlayerZone.fill(currentPlayerId);
	    graveyardZones.MY_GRAVEYARD_ID.fill(currentPlayerId);
	}
	
	moveCardFromHandToGraveyard(domCard){
	    
	    var currentPlayerId = document.getElementById("currentPlayerId").value;
	
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/hand-to-graveyard/"+domCard.getId(), false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    handZone.fill(currentPlayerId);
	    graveyardZones.MY_GRAVEYARD_ID.fill(currentPlayerId);
	}
	
	moveCardFromEquipmentsToGraveyard(domCard){
		
	    var currentPlayerId = document.getElementById("currentPlayerId").value;
	
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/equipment/"+domCard.card.id+"/graveyard", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    equipmentsZone.fill(currentPlayerId);
	    graveyardZones.MY_GRAVEYARD_ID.fill(currentPlayerId);
	    
	}
	
	moveCardFromTrapsToGraveyard(domCard){
	
	    var currentPlayerId = document.getElementById("currentPlayerId").value;
	
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/trap/"+domCard.getId()+"/graveyard", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    trapsZone.fill(currentPlayerId);
	    graveyardZones.MY_GRAVEYARD_ID.fill(currentPlayerId);
	    
	}
}