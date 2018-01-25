document.addEventListener('DOMContentLoaded', function() {
    refreshBoard();
}, false);

function refreshBoard(){
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var currentOppId = Math.abs(1-currentPlayerId);
    fillPVs(currentPlayerId,"playerPvsId");
    fillPVs(currentOppId,"oppPvsId");
    fillDrawBoard(currentPlayerId,"draw","img/Back-Draw.png");
    fillDrawBoard(currentPlayerId,"invocations","img/Back-Select.png");
    fillDrawBoard(currentPlayerId,"environments","img/Back-Select3.png");
    fillDrawBoard(currentPlayerId,"currentEnvironment","img" + getCurrentEnvironmentCard());
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
        img.src = "img/"+encodeURI(cards[i].path);
        img.height = 200;
        img.hspace = 10;
        img.title = cards[i].id;
        img.setAttribute('onclick','displayPoP(this.src);');
        src.appendChild(img);
    }
}

function fillDrawBoard(playerId, id, image){
    var img = document.createElement("img");
    img.src = encodeURI(image);
    img.height = 80;
    img.hspace = 1;
    var src = document.getElementById(id);
    src.innerHTML = '';
    if(id=='currentEnvironment'){
        img.setAttribute('onclick','displayPoP(this.src);');
    }
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
    }else if (id=="invocations"){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "stack/INVOCATIONS", false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        var cards = JSON.parse(xhttp.responseText);
        var selectList = document.createElement("select");
        selectList.id = "selectInvocations";

        src.appendChild(selectList);
        for (var i=0; i< cards.length;i++){
            var option = document.createElement("option");
            option.value = cards[i].id;
            option.text = cards[i].path;
            selectList.appendChild(option);
        }

        var buttonPickInvoc = document.createElement("button");
        buttonPickInvoc.innerHTML = "Piocher Invocation";
        src.appendChild(buttonPickInvoc);

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
    w.document.write("<TD valign='middle' align='center'><IMG src='"+decodeURI(src)+"' border=0 alt='Mon image' height='50%'>");
    w.document.write("</TD></TR></TABLE>");
    w.document.write("</BODY></HTML>");
    w.document.close();
}