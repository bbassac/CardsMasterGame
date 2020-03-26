function fillGraveyard(playerId, graveId,gameImageHeight) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/graveyard", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var graveZone = document.getElementById(graveId);
    var cards = JSON.parse(xhttp.responseText);
    if (cards.length > 0 && oldLastGraveyardOp !== cards[cards.length-1].id) {
        oldLastGraveyardOp = cards[cards.length-1].id;
        graveZone.innerHTML = "";
        if (cards.length > 0) {
            //Appercu dessus de la pile
            var cardDiv = document.createElement("div");
            var img = document.createElement("img");
            img.src = "img/" + encodeURI(cards[cards.length - 1].path);
            img.height = gameImageHeight;
            img.hspace = 5;
            img.title = cards[cards.length - 1].id;
            img.setAttribute('onclick', 'showCardPopin(this.src);');
            cardDiv.appendChild(img);

            //bouton tout afficher
            var buttonDisplayGraveyard = document.createElement("button");
            buttonDisplayGraveyard.innerHTML = "Oo";
            if (graveId == "graveyardId") {
                buttonDisplayGraveyard.setAttribute('onclick', 'displayGrave(\"me\");');
            } else {
                buttonDisplayGraveyard.setAttribute('onclick', 'displayGrave(\"you\");');
            }

            cardDiv.appendChild(buttonDisplayGraveyard);
            graveZone.appendChild(cardDiv);
        }
    }
}



function displayGrave(who){
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var oppPlayerId = Math.abs(1-currentPlayerId);

    var xhttp = new XMLHttpRequest();
    if(who=="me") {
        xhttp.open("GET", "player/" + currentPlayerId + "/graveyard", false);
    }else{
        xhttp.open("GET", "player/" + oppPlayerId + "/graveyard", false);
    }
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);



    var w=open("",'image','toolbar=no,scrollbars=no,resizable=no,left=10,top=10,height=700,width=1530');
    w.document.write("<HTML><HEAD><TITLE>Graveyard</TITLE></HEAD>");
    w.document.write("<BODY>");

    w.document.write("<script>");
    if(who=="me"){
    w.document.write("function addCardToPlayer(currentPlayerId, cardId){\n" +
        "    var xhttp = new XMLHttpRequest();\n" +
        "    xhttp.open(\"GET\", \"player/\"+currentPlayerId+\"/graveyard/\"+cardId, false);\n" +
        "    xhttp.setRequestHeader(\"Content-type\", \"application/json\");\n" +
        "    xhttp.send();\n" +
        "    document.getElementById(\"c-\"+cardId).style.display = \"none\";"+
        "    document.getElementById(cardId).style.display = \"none\";"+
        "}");
    }else{
        w.document.write("function addCardToPlayer(currentPlayerId, cardId){\n" +
            "    var oppPlayerId = Math.abs(1-currentPlayerId); \n"+
            "    var xhttp = new XMLHttpRequest();\n" +
            "    xhttp.open(\"GET\", \"opponent/\"+oppPlayerId+\"/graveyard/\"+cardId+\"/player/\"+currentPlayerId, false);\n" +
            "    xhttp.setRequestHeader(\"Content-type\", \"application/json\");\n" +
            "    xhttp.send();\n" +
            "    document.getElementById(\"c-\"+cardId).style.display = \"none\";"+
            "    document.getElementById(cardId).style.display = \"none\";"+
            "}");
    }
    w.document.write("</script>");

    for (var i=0; i< cards.length;i++) {
        var imgDiv = document.createElement("div");
        var img = document.createElement("img");
        img.src = "img/"+encodeURI(cards[i].path);
        img.height = 330;
        img.hspace = 5;
        img.vspace = 5;
        img.title = cards[i].id;
        img.setAttribute("id","c-"+cards[i].id);
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