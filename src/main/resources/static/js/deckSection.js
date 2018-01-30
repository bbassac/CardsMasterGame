document.addEventListener('DOMContentLoaded', function() {
    refreshBoard();
}, false);


var gameImageHeight = 210;

function refreshBoard(){
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var currentOppId = Math.abs(1-currentPlayerId);
    fillPVs(currentPlayerId,"playerPvsId");
    fillPVs(currentOppId,"oppPvsId");
    fillChakras(currentPlayerId,"playerChakraId");
    fillDrawBoard(currentPlayerId,"draw","img/Back-Draw.png");
    fillDrawBoard(currentPlayerId,"invocations","img/Back-Select.png");
    fillDrawBoard(currentPlayerId,"environments","img/Back-Select3.png");
    fillDrawBoard(currentPlayerId,"currentEnvironment","img" + getCurrentEnvironmentCard());
    fillGraveyard(currentPlayerId,"graveyardId");
    fillGraveyard(currentOppId,"graveyardOppId");
    fillDeck(currentPlayerId,"hand","hand");
    fillDeck(currentPlayerId,"boardPlayer","board");
    fillDeck(currentOppId,"boardOpp","board");
}




function fillDeck(playerId,section,stackName){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/"+stackName, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);
    var src = document.getElementById(section);
    src.innerHTML = '';

    for (var i=0; i< cards.length;i++){
        var cardDiv = document.createElement("div");
        var img = document.createElement("img");
        img.src = "img/"+encodeURI(cards[i].path);
        img.height = gameImageHeight;
        img.hspace = 10;
        img.title = cards[i].id;
        img.setAttribute('onclick','displayPoP(this.src);');
        cardDiv.appendChild(img);


        if (section == "hand"){
            var div = document.createElement("ctrl-"+ cards[i].id);
            var moveCardButton = document.createElement("button");
            moveCardButton.innerHTML = "&uArr;";
            moveCardButton.setAttribute("id",cards[i].id);
            cardDiv.appendChild(moveCardButton);
            moveCardButton.setAttribute('onclick','moveCardToBoard(this.id);');
            cardDiv.appendChild(div);
        }else if (section=="boardPlayer"){
            var div = document.createElement("div-"+ cards[i].id);
            var moveCardButton = document.createElement("button");
            moveCardButton.innerHTML = "&rArr;";
            moveCardButton.setAttribute("id",cards[i].id);
            cardDiv.appendChild(moveCardButton);
            moveCardButton.setAttribute('onclick','moveCardToGraveyard(this.id);');

            //Manage dmg points
            var xhttpDmg = new XMLHttpRequest();
            xhttpDmg.open("GET", "player/"+playerId+"/board/"+cards[i].id+"/dmg", false);
            xhttpDmg.setRequestHeader("Content-type", "application/json");
            xhttpDmg.send();

            var buttonLessDmg = document.createElement("button");
            buttonLessDmg.innerHTML = "-";
            buttonLessDmg.tag = parseInt(xhttpDmg.responseText)-1;
            buttonLessDmg.setAttribute("id",cards[i].id);
            buttonLessDmg.setAttribute('onclick','updateDmgPoints(this.id,this.tag);');
            div.appendChild(buttonLessDmg);

            var nbDmg = document.createTextNode("  " + xhttpDmg.responseText+"  ");
            div.appendChild(nbDmg);

            var buttonMoreDmg = document.createElement("button");
            buttonMoreDmg.innerHTML = "+";
            buttonMoreDmg.tag = parseInt(xhttpDmg.responseText)+1;
            buttonMoreDmg.setAttribute("id",cards[i].id);
            buttonMoreDmg.setAttribute('onclick','updateDmgPoints(this.id,this.tag);');
            div.appendChild(buttonMoreDmg);
            cardDiv.appendChild(div);
        }else if (section=="boardOpp"){
            var div = document.createElement("div");
            //Manage dmg points
            var xhttpDmg = new XMLHttpRequest();
            xhttpDmg.open("GET", "player/"+playerId+"/board/"+cards[i].id+"/dmg", false);
            xhttpDmg.setRequestHeader("Content-type", "application/json");
            xhttpDmg.send();

            var nbDmg = document.createTextNode("  " + xhttpDmg.responseText+"  ");
            div.appendChild(nbDmg);
            cardDiv.appendChild(div);
        }

        src.appendChild(cardDiv);
    }
}

function updateDmgPoints(cardId,newDmgPoint){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId+"/dmg/"+newDmgPoint, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshBoard();
}

function moveCardToBoard(cardId){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshBoard();
}

function moveCardToGraveyard(cardId){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/graveyard/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshBoard();
}



