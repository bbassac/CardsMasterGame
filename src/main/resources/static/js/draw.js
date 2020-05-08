function fillDraw(playerId){

    var src = document.getElementById("draw");
    src.innerHTML = '';

    var img = document.createElement("img");
    img.src = encodeURI("img/Back-Draw.png");
    img.height = drawImageHeight;
    img.id = "imgDraw";
    img.classList.add("imgDraw");
    img.setAttribute('title', "Piocher une carte");
    img.draggable = false;
    
    img.addEventListener ("click", function() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "player/"+playerId+"/newcard", false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        
        //fillHand(playerId);
    	var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "player/"+playerId+"/hand", false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        var cards = JSON.parse(xhttp.responseText);
        addDomCardOnHand(cards[cards.length-1]);
        
    });
    
    src.appendChild(img);
}