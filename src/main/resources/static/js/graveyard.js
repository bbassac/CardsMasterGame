var graveyardDivCardsContainer = [];

function fillGraveyard(playerId, graveId, forceUpdate) {

    // Récupération des cartes du cimetière
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/graveyard", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);

	// Réinit de l'affichage de la pile cimetière
    if (graveyardDivCardsContainer[graveId] == null) {
    	graveyardDivCardsContainer[graveId] = document.getElementById(graveId);
    	
    	if (graveId == "graveyardId") {
    		setAsDropArea(graveyardDivCardsContainer[graveId], graveyardAllowDrop, graveyardDrop);
    	}
    }
    
    if (cards.length == 0) {
    	if (graveyardDivCardsContainer[graveId].childNodes.length > 0) {
    		// Si il n'y a plus de carte dans le cimetière on efface la pile cimetière si nécessaire
    		graveyardDivCardsContainer[graveId].innerHTML = "";
    	}

    }else if (forceUpdate || oldLastGraveyard[playerId] !== cards[cards.length-1].id) {
    
	    // Si il y a des cartes dans le cimetière et que la carte du haut de la pile a changé
	    // Mise à jour de l'affichage de la pile cimetière

    	addDomCardOnGraveyard(playerId, cards[cards.length - 1], graveId);
    	
    }
}

function addDomCardOnGraveyard(playerId, card, graveId) {
	
	if ((graveyardDivCardsContainer[graveId] != null) && (card != null)) {
	
	    var who = (graveId == "graveyardId") ? "me" : "you";

	    oldLastGraveyard[playerId] = card.id;
	    graveyardDivCardsContainer[graveId].innerHTML = "";
	
		var menu = [
			{ text: "Afficher le cimetière", action: function() { showPopinGrave(who); } },
		];
	
		var domCard = getDomCard(card, graveyardHeight, CARD_DRAW_MODES_DICE);
		domCard.divCardsContainer = graveyardDivCardsContainer[graveId];
		
		graveyardDivCardsContainer[graveId].appendChild(domCard.divCard);
	    domCard.addMenu(menu);
	
	    var v = [playerId, who, card.id, graveId, domCard.getId(), domCard.divCard.id];
	}
}


function showPopinGrave(who){

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

	displayPopinSelectCard(who, cards, putCardFromGraveyardToPlayer, "url('img/Graveyard-2.png')");
}

function putCardFromGraveyardToPlayer(playerId, card, who) {

	if(who=="me"){
		addGraveyardCardToMe(playerId, card);
		fillGraveyard(playerId, "graveyardId");
	} else {
		var oppPlayerId = Math.abs(1-playerId);
		addGraveyardCardToYou(playerId, oppPlayerId, card);	
		fillGraveyard(oppPlayerId,"graveyardOppId");
	}

	addDomCardOnHand(card);
	hideCardSelectPopin();
}

/**
 * Ajoute une carte d'un cimetière dans la main du joueur courant
 */
function addGraveyardCardToMe(playerId, card) {
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "player/" + playerId + "/graveyard/" + card.id, false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
	
}

/**
 * Ajoute une carte d'un cimetière dans la main de l'adversaire du joueur courant
 */
function addGraveyardCardToYou(playerId, oppPlayerId, card) {
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "opponent/" + oppPlayerId + "/graveyard/" + card.id + "/player/" + playerId, false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
	
}

function graveyardAllowDrop(fromDivId, toDivId, domCard) {
	return true;
}

function graveyardDrop(fromDivId, toDivId, domCard) {

	switch(fromDivId) {
		case "hand_divCardsContainer" : 
			moveHandCardToGraveyard(domCard);
			break;
		case "boardPlayer_divCardsContainer" : 
			moveCardToGraveyard(domCard);
			break;
		case "equipments_divCardsContainer" : 
			moveCardFromEquipmentsToGraveyard(domCard);
			break;
		case "traps" : 
			moveCardFromTrapsToGraveyard(domCard);
			break;
	}
	
	
}