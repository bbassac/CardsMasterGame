function fillGraveyard(playerId, graveId) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/graveyard", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var graveZone = document.getElementById(graveId);
    graveZone.innerHTML="";
    var cards = JSON.parse(xhttp.responseText);
    if (cards.length>0) {
        //Appercu dessus de la pile
        var cardDiv = document.createElement("div");
        var img = document.createElement("img");
        img.src = "img/" + encodeURI(cards[cards.length-1].path);
        img.height = gameImageHeight;
        img.hspace = 10;
        img.title = cards[cards.length-1].id;
        img.setAttribute('onclick', 'displayPoP(this.src);');
        cardDiv.appendChild(img);

        //bouton tout afficher
        var buttonDisplayGraveyard = document.createElement("button");
        buttonDisplayGraveyard.innerHTML = "Oo";
        buttonDisplayGraveyard.setAttribute('onclick','displayGrave();');

        cardDiv.appendChild(buttonDisplayGraveyard);
        graveZone.appendChild(cardDiv);
    }
}

function displayGrave(){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentPlayerId+"/graveyard", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);



    var w=open("",'image','toolbar=no,scrollbars=no,resizable=no,left=10,top=10,height=700,width=1500');
    w.document.write("<HTML><HEAD><TITLE>Graveyard</TITLE></HEAD>");
    w.document.write("<BODY>");

    w.document.write("<script>");
    w.document.write("function addCardToPlayer(currentPlayerId, cardId){\n" +
        "    console.log(\"addCardToplayer \"+currentPlayerId+\" / \" + cardId);" +
        "    var xhttp = new XMLHttpRequest();\n" +
        "    xhttp.open(\"GET\", \"player/\"+currentPlayerId+\"/graveyard/\"+cardId, false);\n" +
        "    xhttp.setRequestHeader(\"Content-type\", \"application/json\");\n" +
        "    xhttp.send();\n" +
        "}");
    w.document.write("</script>");

    for (var i=0; i< cards.length;i++) {
        var imgDiv = document.createElement("div");
        var img = document.createElement("img");
        img.src = "img/"+encodeURI(cards[i].path);
        img.height = 300;
        img.hspace = 5;
        img.vspace = 5;
        img.title = cards[i].id;

        imgDiv.appendChild(img);
        w.document.write(imgDiv.innerHTML);

        var buttonDiv = document.createElement("button");
        buttonDiv.innerHTML = "+";
        buttonDiv.setAttribute("id",cards[i].id);
        buttonDiv.title = parseInt(currentPlayerId);
        console.log("player id = "+currentPlayerId);
        buttonDiv.setAttribute('onclick','addCardToPlayer(this.title,this.id);');

        w.document.write(buttonDiv.outerHTML);
    }
    w.document.write("</BODY></HTML>");

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
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/pvs/"+newValue, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    fillPVs(currentPlayerId,"playerPvsId");
}

function updateChakras(newValue){
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/chakra/"+newValue, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    fillChakras(currentPlayerId,"playerChakraId");
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