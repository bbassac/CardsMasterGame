function fillGraveyard(playerId, graveId, gameImageHeight, forceUpdate) {

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

        oldLastGraveyard[playerId] = cards[cards.length-1].id;

		graveyardArea.innerHTML = "";
    
        //Appercu dessus de la pile
        var cardDiv = document.createElement("div");
        if (graveId == "graveyardId") {
            cardDiv.id="divGraveyardMe";
        } else {
            cardDiv.id="divGraveyardYou";
        }
                   
        var img = document.createElement("img");            
        img.src = "img/" + encodeURI(cards[cards.length - 1].path);
        img.height = gameImageHeight;
        img.title = cards[cards.length - 1].id;
        img.setAttribute('onclick', 'showCardPopin(this.src);');
        img.classList.add("graveyardStack");
        cardDiv.appendChild(img);
        graveyardArea.appendChild(cardDiv);
        
        if (graveId == "graveyardId") {
        	setZooming(img, TRANSLATE_CENTER);
            img.setAttribute('onclick', 'showPopinGrave(\"me\");');
        } else {
			setZooming(img, TRANSLATE_DOWN);
            img.setAttribute('onclick', 'showPopinGrave(\"you\");');
        }

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

	displayPopinSelectCard(who, cards, putCardFromGraveyardToPlayer, "url('../img/Graveyard-2.png')");
}

function putCardFromGraveyardToPlayer(cardId, playerId, who) {

	if(who=="me"){
		addGraveyardCardToMe(cardId, playerId);
	} else {
		addGraveyardCardToYou(cardId, playerId);	
	}

	hideCardSelectPopin();
	refreshBoard();
}

/**
 * Ajoute une carte d'un cimetière dans la main du joueur courant
 */
function addGraveyardCardToMe(cardId, playerId) {
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "player/" + playerId + "/graveyard/" + cardId, false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
	
}

/**
 * Ajoute une carte d'un cimetière dans la main de l'adversaire du joueur courant
 */
function addGraveyardCardToYou(cardId, playerId) {

	var oppPlayerId = Math.abs(1-playerId);
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "opponent/" + oppPlayerId + "/graveyard/" + cardId + "/player/" + playerId, false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
	
}