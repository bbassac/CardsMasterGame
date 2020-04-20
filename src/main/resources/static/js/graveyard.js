function fillGraveyard(playerId, graveId, imageHeight, forceUpdate) {

    // Récupération des cartes du cimetière
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/graveyard", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);

	// Réinit de l'affichage de la pile cimetière
    var graveyardArea = document.getElementById(graveId);
    

    if (cards.length == 0) {
    	// Si il n'y a plus de carte dans le cimetière on efface la pile cimetière
		graveyardArea.innerHTML = "";

    }else if (forceUpdate || oldLastGraveyard[playerId] !== cards[cards.length-1].id) {
	    // Si il y a des cartes dans le cimetière et que la carte du haut de la pile a changé
	    // Mise à jour de l'affichage de la pile cimetière

        var who = (graveId == "graveyardId") ? "me" : "you";

        oldLastGraveyard[playerId] = cards[cards.length-1].id;

		graveyardArea.innerHTML = "";
    
		var menu = [
			{ text: "Afficher le cimetière", action: function() { showPopinGrave(who); } },
			{ text: "Action 2", action: function() { alert("clique sur Action 2"); } },
			{ text: "Action 3", action: function() { alert("clique sur Action 3"); } }
		];

    	var domCard = new DomCard(cards[cards.length - 1], imageHeight, CARD_DRAW_MODES_DICE);
		graveyardArea.appendChild(domCard.divCard);
        domCard.addMenu(menu);
               
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

	displayPopinSelectCard(who, cards, putCardFromGraveyardToPlayer, "url('/../img/Graveyard-2.png')");
}

function putCardFromGraveyardToPlayer(playerId, card, who) {

	if(who=="me"){
		addGraveyardCardToMe(playerId, card);
	} else {
		addGraveyardCardToYou(playerId, card);	
	}

	hideCardSelectPopin();
	refreshBoard();
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
function addGraveyardCardToYou(playerId, card) {

	var oppPlayerId = Math.abs(1-playerId);
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "opponent/" + oppPlayerId + "/graveyard/" + card.id + "/player/" + playerId, false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
	
}