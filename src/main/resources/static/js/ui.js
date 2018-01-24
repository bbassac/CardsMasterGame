document.addEventListener('DOMContentLoaded', function() {
    refreshBoard();
}, false);

function refreshBoard(){
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var currentOppId = Math.abs(1-currentPlayerId);
    fillPVs(currentPlayerId,"playerPvsId");
    fillPVs(currentOppId,"oppPvsId");
    fillDeckImage(currentPlayerId,"draw","img/Back-Draw.png");
    fillDeckImage(currentPlayerId,"invocations","img/Back-Select.png");
    fillDeckImage(currentPlayerId,"environments","img/Back-Select3.png");
    fillDeckImage(currentPlayerId,"currentEnvironment","img" + getCurrentEnvironmentCard());
    fillDeck(currentPlayerId,"hand","hand");
    fillDeck(currentPlayerId,"boardPlayer","board");
    fillDeck(currentOppId,"boardOpp","board");
}

function fillPVs(playerId,componentId) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/pvs", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    document.getElementById(componentId).textContent =  xhttp.responseText;
}

function getCurrentEnvironmentCard() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "stack/ENVIRONNEMENT", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    return JSON.parse(xhttp.responseText)[0].path;
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
        var img = document.createElement("img");
        img.src = encodeURI("img/"+cards[i].path);
        img.height = 200;
        img.hspace = 10;
        src.appendChild(img);
    }
}

function fillDeckImage(playerId,id,image){
    var img = document.createElement("img");
    img.src = encodeURI(image);
    img.height = 100;
    img.hspace = 60;
    var src = document.getElementById(id);
    src.innerHTML = '';
    src.appendChild(img);
    if (id=="draw"){
        // 1. Create the button
        var button = document.createElement("button");
        button.innerHTML = "Piocher";
        src.appendChild(button);

        // 3. Add event handler
        button.addEventListener ("click", function() {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "player/"+playerId+"/newcard", false);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
            refreshBoard();
        });
    }
}