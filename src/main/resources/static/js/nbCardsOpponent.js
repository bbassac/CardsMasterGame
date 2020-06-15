function  fillNbCards(currentOppId,componentId,nbCardsHeight){
	
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentOppId+"/hand", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);
    var nbCards = cards.length;
    document.getElementById('oppNbCardId').title=OPP_NB_CARD;
    if (nbCards !== oldNbCards) {
    	
        oldNbCards=nbCards;
        
        var component = document.getElementById(componentId);
        component.innerHTML="";
        var bold = document.createElement("b");
        var nb = document.createTextNode(nbCards + " card(s)");

        bold.appendChild(nb);

        component.appendChild(bold);
    }
}
