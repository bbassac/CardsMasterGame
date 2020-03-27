document.addEventListener('DOMContentLoaded', function() {
    refreshBoard();
}, false);

setInterval(refreshOpponentBoard, 500);

const drawImageHeight = 140;
const gameImageHeight = 255;
const trapImageHeight = 150;
const trapIconHeight = 50;
const nbCardsHeight = 30;
var oldNbTrapsOpp=0 ;
var oldLastGraveyardOp = 0;
var oldNbCards=-1;
var handIconSize = 30;

function refreshBoard(){
    var currentPlayerId = document.getElementById("currentPlayerId").value;


    fillDrawBoard(currentPlayerId,"draw","img/Back-Draw.png",drawImageHeight);
    fillDrawBoard(currentPlayerId,"invocations","img/Back-Select.png",drawImageHeight);
    refreshEnvironment(drawImageHeight);
	fillGraveyard(currentPlayerId,"graveyardId",gameImageHeight);
    refreshOpponentBoard();
    refreshPlayerBoard();
}

function refreshEnvironment(drawImageHeight) {
	fillDrawBoard(currentPlayerId,"currentEnvironment","img" + getCurrentEnvironmentCard(),drawImageHeight);
<<<<<<< HEAD
		
	var envCard = document.getElementById("currentEnvironment");
	if (envCard) {
		envCard.setAttribute('onmouseenter','maximizeEnvironment()');
		envCard.setAttribute('onmouseleave','minimizeEnvironment()');
	}
}

/**
 * Applique un zoom sur la carte d'environnement
 */
function maximizeEnvironment() {

	var envCard = document.getElementById("currentEnvironment");
	var envCardDiv = null;
	var envCardImg = null;
	
	if (envCard) {
		envCardDiv = envCard.children[0];
	}

	if (envCardDiv) {
		envCardImg = envCardDiv.children[0];
	}
	
	if (envCardImg) {
		var oldHeight = drawImageHeight;
		var newHeight = (gameImageHeight * 2);
		envCardDiv.style.transform ="translateY(" + (oldHeight - newHeight) + "px)";		
		envCardImg.style.height = newHeight + "px";
	}		

}

/**
 * Annule zoom sur la carte d'environnement
 */
function minimizeEnvironment() {

	var envCard = document.getElementById("currentEnvironment");
	var envCardDiv = null;
	var envCardImg = null;
	
	if (envCard) {
		envCardDiv = envCard.children[0];
	}

	if (envCardDiv) {
		envCardImg = envCardDiv.children[0];
	}
		
	if (envCardImg) {
		var oldHeight = (gameImageHeight * 2);
		var newHeight = drawImageHeight;
		envCardDiv.style.transform ="";		
		envCardImg.style.height = newHeight + "px";
	}		

}

function refreshOpponentBoard(){
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var currentOppId = Math.abs(1-currentPlayerId);
    fillPVs(currentOppId,"oppPvsId");
    fillNbTraps(currentOppId, "nbTrapsId",trapIconHeight);
    fillNbCards(currentOppId,"nbCardsId",nbCardsHeight)
    fillDeckOpp(currentOppId,"boardOpp","board",gameImageHeight);
    fillGraveyard(currentOppId,"graveyardOppId",gameImageHeight);
	
    refreshLastDiceThrow();
    displayOppExtra(currentOppId);
}

function refreshPlayerBoard(){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    fillPVs(currentPlayerId,"playerPvsId");
    fillGraveyard(currentPlayerId,"graveyardId",gameImageHeight);
    fillDeck(currentPlayerId,"hand","hand",gameImageHeight);
    fillDeck(currentPlayerId,"boardPlayer","board",gameImageHeight);
    fillDeck(currentPlayerId,"traps","traps",trapImageHeight);
    fillChakras(currentPlayerId,"playerChakraId");
    fillDiceArea(currentPlayerId,"diceId");
    displayExtraArea(currentPlayerId,"extraPlayerId");
}

function fillDeck(playerId,section,stackName,gameImageHeight){
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
        img.hspace = 5;
        img.title = cards[i].id;
        img.setAttribute('onclick','showCardPopin(this.src);');
        cardDiv.appendChild(img);
        if(cards[i].activated){
            img.setAttribute('style', 'transform:rotate(90deg);'); // the 90deg parameter may be changed to whatever angle you want to rotate to
        }
        if (cards[i].used){
            img.setAttribute("class","usedCard")
        }


        if (section == "hand"){
            var divBlock = document.createElement("div-"+ cards[i].id);

            var moveCardButton = document.createElement("button");
            moveCardButton.innerHTML = "&uArr;";
            moveCardButton.setAttribute("id",cards[i].id);
            moveCardButton.setAttribute('onclick','moveCardToBoard(this.id);');


            divBlock.appendChild(moveCardButton);


            var moveTrapButton = document.createElement("button");
            moveTrapButton.innerHTML = "&rArr;";
            moveTrapButton.setAttribute("id",cards[i].id);

            moveTrapButton.setAttribute('onclick','moveCardToTrap(this.id);');
            divBlock.appendChild(moveTrapButton);

            //Move button
            var moveGrave = document.createElement("button");
            moveGrave.innerHTML = "&#9760;";
            moveGrave.setAttribute("id",cards[i].id);
            moveGrave.setAttribute("class","grave-button");
            moveGrave.setAttribute('onclick','moveHandCardToGraveyard(this.id);');
            divBlock.appendChild(moveGrave);

            cardDiv.appendChild(divBlock);

        }else if (section=="traps"){
            var divBlock = document.createElement("tr-"+ cards[i].id);

            var moveCardButton = document.createElement("button");
            moveCardButton.innerHTML = "&#9760;";
            moveCardButton.setAttribute("id",cards[i].id);
            moveCardButton.setAttribute("class","grave-button");
            moveCardButton.setAttribute('onclick','moveCardFromTrapsToGraveyard(this.id);');
            divBlock.appendChild(moveCardButton);
            cardDiv.appendChild(divBlock);

        }else if (section=="boardPlayer"){
            var div = document.createElement("div-"+ cards[i].id);

                      //Manage dmg points

            var buttonLessDmg = document.createElement("button");
            buttonLessDmg.innerHTML = "-";
            buttonLessDmg.tag = parseInt(cards[i].dammagePoints)-1;
            buttonLessDmg.setAttribute("id",cards[i].id);
            buttonLessDmg.setAttribute('onclick','updateDmgPoints(this.id,this.tag);');
            div.appendChild(buttonLessDmg);

            var bold = document.createElement("b");
            var nbDmg = document.createTextNode("  " + cards[i].dammagePoints+"  ");
            bold.style.fontSize = "medium";
            if (cards[i].dammagePoints>0){
                bold.style.color = 'red';
            }

            bold.appendChild(nbDmg);
            div.appendChild(bold);

            var buttonMoreDmg = document.createElement("button");
            buttonMoreDmg.innerHTML = "+";
            buttonMoreDmg.tag = parseInt(cards[i].dammagePoints)+1;
            buttonMoreDmg.setAttribute("id",cards[i].id);
            buttonMoreDmg.setAttribute('onclick','updateDmgPoints(this.id,this.tag);');
            div.appendChild(buttonMoreDmg);
            //empty block
            var emptyBlock = document.createElement("span");

            emptyBlock.innerHTML="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
            div.appendChild(emptyBlock);

            //Activate Button
            var flipButton = document.createElement("button");
            flipButton.innerHTML = "&#8631";
            flipButton.tag = cards[i].activated;
            flipButton.setAttribute("id",cards[i].id);
            flipButton.setAttribute('onclick','flipCard(this.id,this.tag);');
            div.appendChild(flipButton)

            //use button
            var useButton = document.createElement("button");
            useButton.innerHTML = "%";
            useButton.tag = cards[i].used;
            useButton.setAttribute("id",cards[i].id);
            useButton.setAttribute('onclick','useCard(this.id,this.tag);');
            div.appendChild(useButton)
            //Move button
            var moveCardButton = document.createElement("button");
            moveCardButton.innerHTML = "&#9760;";
            moveCardButton.setAttribute("id",cards[i].id);
            moveCardButton.setAttribute("class","grave-button");
            moveCardButton.setAttribute('onclick','moveCardToGraveyard(this.id);');
            div.appendChild(moveCardButton);

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

function flipCard(cardId,curentvalue){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId+"/activated/"+!curentvalue, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)
}

function useCard(cardId,curentvalue){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId+"/used/"+!curentvalue, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)
}

function updateDmgPoints(cardId,newDmgPoint){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId+"/dmg/"+newDmgPoint, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)
}

function moveCardToBoard(cardId){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)
}

function moveCardToTrap(cardId){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/trap/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)
}

function moveHandCardToGraveyard(cardId){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/hand-to-graveyard/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)
}

function moveCardToGraveyard(cardId){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/graveyard/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)
}

function moveCardFromTrapsToGraveyard(cardId){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/trap/"+cardId+"/graveyard", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshPlayerBoard(currentPlayerId)
}


