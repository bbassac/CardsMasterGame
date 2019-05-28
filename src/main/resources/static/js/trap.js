
function fillNbTraps(oppPlayerId, componentId,trapSize) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/" + oppPlayerId + "/traps", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var traps = JSON.parse(xhttp.responseText);

    var component = document.getElementById(componentId);
    var nbTraps = traps.length;
    if (nbTraps !== oldNbTrapsOpp) {
        oldNbTrapsOpp = nbTraps;
        component.innerText = "";
        for (var i = 0; i < nbTraps; i++) {
            var imgDiv = document.createElement("div");
            var img = document.createElement("img");
            img.src = "img/Star.png";
            img.height = trapSize;
            imgDiv.appendChild(img);

            component.appendChild(imgDiv);
        }
    }
}

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