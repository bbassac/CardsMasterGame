function fillGraveyard(playerId, graveId, gameImageHeight) {

    // Récupération des cartes du cimetière
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/graveyard", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);

	// Réinit de l'affichage de la pile cimetière
    var graveZone = document.getElementById(graveId);
    
    
    console.log("joueur " + playerId + " : " + cards.length + ", " + oldLastGraveyard[playerId] + ", " + cards[cards.length-1].id + ", " + graveId);
    
    // Si il y a des cartes dans le cimetière et que la carte du haut de la pile a changé
    // Mise à jour de l'affichage de la pile cimetière
    if (cards.length == 0) {
		graveZone.innerHTML = "";    
    }else if (oldLastGraveyard[playerId] !== cards[cards.length-1].id) {
        oldLastGraveyard[playerId] = cards[cards.length-1].id;
 
		graveZone.innerHTML = "";
    
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
        //img.hspace = 5;
        img.title = cards[cards.length - 1].id;
        img.setAttribute('onclick', 'showCardPopin(this.src);');
        
        if (graveId == "graveyardId") {
			img.setAttribute('onmouseenter', 'zoomCard(this, TRANSLATE_CENTER)');
		} else {
			img.setAttribute('onmouseenter', 'zoomCard(this, TRANSLATE_DOWN_LEFT)');
		}
        img.setAttribute('onmouseleave', 'unzoomCard(this)');
        img.classList.add("graveyardStack");
        cardDiv.appendChild(img);

        //bouton tout afficher
        var divButtonDisplayGraveyard1 = document.createElement("div");
        divButtonDisplayGraveyard1.classList.add("toGraveyardDiv");
        var divButtonDisplayGraveyard2 = document.createElement("div");
        var buttonDisplayGraveyard = document.createElement("button");
        buttonDisplayGraveyard.innerHTML = "Oo";
        buttonDisplayGraveyard.classList.add("toGraveyardButton");
        if (graveId == "graveyardId") {
            buttonDisplayGraveyard.setAttribute('onclick', 'displayGrave(\"me\");');
        } else {
            buttonDisplayGraveyard.setAttribute('onclick', 'displayGrave(\"you\");');
        }

        graveZone.appendChild(cardDiv);
        
        divButtonDisplayGraveyard2.appendChild(buttonDisplayGraveyard);
        divButtonDisplayGraveyard1.appendChild(divButtonDisplayGraveyard2);
        graveZone.appendChild(divButtonDisplayGraveyard1);
    }
}

function displayGrave(who){

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


	showGraveyardPopin();

	var popinDiv = document.getElementById("popinGraveyardCardsArea");
	popinDiv.innerHTML = ""; 

    for (var i=0; i< cards.length;i++) {

		// une div par carte         
        var cardDiv = document.createElement("div");
        cardDiv.classList.add("graveyarcCardDiv");
		cardDiv.style.position = "relative";        
        cardDiv.setAttribute('onmouseenter','showAddButton(\"buttonDiv' + cards[i].id + '\")');
        cardDiv.setAttribute('onmouseleave','hideAddButton(\"buttonDiv' + cards[i].id + '\")');
        
        
        // image de la carte
        var imgDiv = document.createElement("div");
        
        var img = document.createElement("img");
        img.src = "img/"+encodeURI(cards[i].path);
        img.height = 330;
        img.hspace = 5;
        img.vspace = 5;
        img.setAttribute("position", "absolute");
        img.title = cards[i].id;
        img.setAttribute("id","c-"+cards[i].id);
        imgDiv.appendChild(img);
        cardDiv.appendChild(imgDiv);

		// bouton d'ajout vers un joueur
		var buttonDiv = document.createElement("div");
		buttonDiv.setAttribute("id" , "buttonDiv" + cards[i].id);
        buttonDiv.style.position = "absolute";		
		buttonDiv.style.width = "100%";
		buttonDiv.style.top = "0px";
		buttonDiv.style.display = "none";
        cardDiv.appendChild(buttonDiv);

        var button = document.createElement("button");
        button.innerHTML = "+";
        button.setAttribute("id",cards[i].id);
        button.title = parseInt(currentPlayerId);
        button.setAttribute('onclick','putCardFromGraveyardToPlayer(this.title,this.id,\"' + who + '\")');
        button.style.width = "100%";
        buttonDiv.appendChild(button);        

		// ajout de la carte à la popin
		popinDiv.appendChild(cardDiv);

        console.log("player id = "+currentPlayerId);
    }
}

function showAddButton(divId) {
	document.getElementById(divId).style.display = 'block';
}

function hideAddButton(divId) {
	document.getElementById(divId).style.display = 'none';
}

function putCardFromGraveyardToPlayer(playerId, cardId, who) {
	
	console.log('Ajout de la carte ' + cardId + ' du joueur ' + playerId + ' vers ' + who);
	
	if(who=="me"){
		addCardToMe(playerId, cardId);
	} else {
		addCardToYou(playerId, cardId);	
	}
	
	//document.getElementById("c-" + cardId).style.display = "none";
	//document.getElementById(cardId).style.display = "none";

	hideGraveyardPopin();
	refreshBoard();
}

/**
 * Ajoute une carte d'un cimetière dans la main du joueur courant
 */
function addCardToMe(playerId, cardId) {
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "player/" + playerId + "/graveyard/" + cardId, false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
	
}

/**
 * Ajoute une carte d'un cimetière dans la main de l'adversaire du joueur courant
 */
function addCardToYou(playerId, cardId) {

	var oppPlayerId = Math.abs(1-playerId);
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "opponent/" + oppPlayerId + "/graveyard/" + cardId + "/player/" + playerId, false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
	
}