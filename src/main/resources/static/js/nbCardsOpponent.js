function  fillNbCards(currentOppId,componentId,nbCardsHeight){
	
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentOppId+"/hand", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);
    var nbCards = cards.length;
    
    if (nbCards !== oldNbCards) {
    	
        oldNbCards=nbCards;
        
        var component = document.getElementById(componentId);
        component.innerHTML="";
        var bold = document.createElement("b");
        var nb = document.createTextNode(nbCards + " card(s)");

        var img = document.createElement("img");
        img.id="handImgId";
        img.src = "img/hand.png";
        img.height = handIconSize;
        component.appendChild(img);

        bold.appendChild(nb);

        component.appendChild(bold);
    }
}
