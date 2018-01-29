document.addEventListener('DOMContentLoaded', function() {
    refreshBoard();
}, false);

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
    fillDeck(currentPlayerId,"hand","hand");
    fillDeck(currentPlayerId,"boardPlayer","board");
    fillDeck(currentOppId,"boardOpp","board");
}

function fillChakras(playerId,componentId) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/chakra", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var component = document.getElementById(componentId);
    component.textContent =  xhttp.responseText;
    var linebreak = document.createElement("br");
    component.appendChild(linebreak);

    var buttonLessChakra = document.createElement("button");
    buttonLessChakra.innerHTML = "-";
    buttonLessChakra.tag = parseInt(xhttp.responseText)-1;
    buttonLessChakra.setAttribute('onclick','updateChakras(this.tag);');
    component.appendChild(buttonLessChakra);

    var buttonMoreChakra = document.createElement("button");
    buttonMoreChakra.innerHTML = "+";
    buttonMoreChakra.tag = parseInt(xhttp.responseText)+1;
    buttonMoreChakra.setAttribute('onclick','updateChakras(this.tag);');
    component.appendChild(buttonMoreChakra);

}

function fillPVs(playerId,componentId) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/pvs", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var component = document.getElementById(componentId);
    component.textContent =  xhttp.responseText;
    var linebreak = document.createElement("br");
    component.appendChild(linebreak);
    if (componentId=="playerPvsId"){
        var buttonLessPv = document.createElement("button");
        buttonLessPv.innerHTML = "-";
        buttonLessPv.tag = parseInt(xhttp.responseText)-1;
        buttonLessPv.setAttribute('onclick','updatePvs(this.tag);');
        component.appendChild(buttonLessPv);

        var buttonMorePv = document.createElement("button");
        buttonMorePv.innerHTML = "+";
        buttonMorePv.tag = parseInt(xhttp.responseText)+1;
        buttonMorePv.setAttribute('onclick','updatePvs(this.tag);');
        component.appendChild(buttonMorePv);
    }
}

function updatePvs(newValue){
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    console.log(newValue);
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/pvs/"+newValue, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    fillPVs(currentPlayerId,"playerPvsId");
}

function updateChakras(newValue){
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    console.log(newValue);
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/chakra/"+newValue, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    fillChakras(currentPlayerId,"playerChakraId");
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
        var cardDiv = document.createElement("div");
        var img = document.createElement("img");
        img.src = "img/"+encodeURI(cards[i].path);
        img.height = 200;
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

            var nbChakra = document.createTextNode("  " + xhttpDmg.responseText+"  ");
            div.appendChild(nbChakra);

            var buttonMoreDmg = document.createElement("button");
            buttonMoreDmg.innerHTML = "+";
            buttonMoreDmg.tag = parseInt(xhttpDmg.responseText)+1;
            buttonMoreDmg.setAttribute("id",cards[i].id);
            buttonMoreDmg.setAttribute('onclick','updateDmgPoints(this.id,this.tag);');
            div.appendChild(buttonMoreDmg);
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


function fillDrawBoard(playerId, id, image){
    var img = document.createElement("img");
    img.src = encodeURI(image);
    img.height = 80;
    img.hspace = 1;
    var src = document.getElementById(id);
    src.innerHTML = '';
    var div = document.createElement("div");
    src.appendChild(div);
    if(id=='currentEnvironment'){
        img.setAttribute('onclick','displayPoP(this.src);');
    }
    div.appendChild(img);
    if (id=="draw"){
        // 1. Create the button
        var button = document.createElement("button");
        button.innerHTML = "Piocher";
        div.appendChild(button);

        // 3. Add event handler
        button.addEventListener ("click", function() {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "player/"+playerId+"/newcard", false);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
            refreshBoard();
        });
    }else if (id=="invocations"){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "stack/INVOCATIONS", false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        var cards = JSON.parse(xhttp.responseText);
        var selectList = document.createElement("select");
        selectList.id = "selectInvocations";

        div.appendChild(selectList);
        for (var i=0; i< cards.length;i++){
            var option = document.createElement("option");
            option.value = cards[i].id;
            option.text = cards[i].path;
            selectList.appendChild(option);
        }

        var buttonPickInvoc = document.createElement("button");
        buttonPickInvoc.innerHTML = "Piocher Invocation";
        div.appendChild(buttonPickInvoc);

        buttonPickInvoc.setAttribute('onclick','pickInvocation(document.getElementById(\'selectInvocations\').value);');
    }
}

function pickInvocation(cardId){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentPlayerId+"/invocations/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshBoard();
}

function displayPoP(src){

    titre="Agrandissement";
    w=open("",'image','toolbar=no,scrollbars=no,resizable=no');
    w.document.write("<HTML><HEAD><TITLE>"+titre+"</TITLE></HEAD>");
    w.document.write("<SCRIPT language=javascript>function checksize() { if (document.images[0].complete) { window.resizeTo((document.images[0].width/1)+40,(document.images[0].height/1)+70); window.focus();} else { setTimeout('checksize()',250) } }</"+"SCRIPT>");
    w.document.write("<BODY onload='checksize()' onblur='window.close()' onclick='window.close()' leftMargin=0 topMargin=0 marginwidth=0 marginheight=0>");
    w.document.write("<TABLE width='100%' border='0' cellspacing='0' cellpadding='0' height='100%'><TR>");
    w.document.write("<TD valign='middle' align='center'><IMG src='"+src.replace(/'/g, '%27')+"' border=0 alt='Mon image' height='50%'>");
    w.document.write("</TD></TR></TABLE>");
    w.document.write("</BODY></HTML>");
    w.document.close();
}