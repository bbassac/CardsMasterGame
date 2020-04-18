function displayPopinSelectCard(who, cards, addFunction, background) {

    var currentPlayerId = document.getElementById("currentPlayerId").value;

	showCardSelectPopin(background);

	var popinDiv = document.getElementById("popinCardsArea");
	popinDiv.innerHTML = ""; 

    for (var i=0; i< cards.length;i++) {

		// une div par carte         
        var cardDiv = document.createElement("div");
        cardDiv.classList.add("selectCardDiv");
		cardDiv.style.position = "relative";        
        cardDiv.setAttribute('onmouseenter','showAddButton(\"buttonDiv' + cards[i].id + '\")');
        cardDiv.setAttribute('onmouseleave','hideAddButton(\"buttonDiv' + cards[i].id + '\")');
        
        
        // image de la carte
        var imgDiv = document.createElement("div");
        
        var img = document.createElement("img");
        img.src = "img"+encodeURI(cards[i].path);
        img.height = 330;
        img.hspace = 5;
        img.vspace = 5;
        img.setAttribute("position", "absolute");
        img.title = cards[i].id;
        img.setAttribute("id","c-"+cards[i].id);
        img.onclick = (function() {showCardPopin(this.src); }).bind(img) ;
        imgDiv.appendChild(img);
        cardDiv.appendChild(imgDiv);

		// bouton d'ajout vers un joueur
		var buttonDiv = document.createElement("div");
		buttonDiv.setAttribute("id" , "buttonDiv" + cards[i].id);
		buttonDiv.classList.add('graveDivButtonClass')
        cardDiv.appendChild(buttonDiv);

        var button = document.createElement("button");
        button.innerHTML = "+";
        
        button.cardId = cards[i].id;
        button.addEventListener("click", addFunction.bind(cards[i], cards[i].id, parseInt(currentPlayerId), who)); 
        
        
        button.classList.add('graveButtonClass');
        buttonDiv.appendChild(button);        

		// ajout de la carte à la popin
		popinDiv.appendChild(cardDiv);

    }
}

function showAddButton(divId) {
	document.getElementById(divId).style.display = 'block';
}

function hideAddButton(divId) {
	document.getElementById(divId).style.display = 'none';
}