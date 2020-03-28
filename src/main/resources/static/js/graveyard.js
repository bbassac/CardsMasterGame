function fillGraveyard(playerId, graveId, gameImageHeight) {
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
            if (graveId == "graveyardId") {
                cardDiv.id="divGraveyardMe"
            } else {
                cardDiv.id="divGraveyardYou"
            }
                       
            var img = document.createElement("img");            
            img.src = "img/" + encodeURI(cards[cards.length - 1].path);
            img.height = gameImageHeight;
            //img.hspace = 5;
            img.title = cards[cards.length - 1].id;
            img.setAttribute('onclick', 'showCardPopin(this.src);');
            
            if (graveId == "graveyardId") {
				img.setAttribute('onmouseenter', 'zoomCard(this, TRANSLATE_CENTER)');
			} else {
				img.setAttribute('onmouseenter', 'zoomCard(this, TRANSLATE_DOWN_LEFT)');
			}
            img.setAttribute('onmouseleave', 'unzoomCard(this)');
            img.classList.add("graveyardStack");
            cardDiv.appendChild(img);

            //bouton tout afficher
            var divButtonDisplayGraveyard1 = document.createElement("div");
            divButtonDisplayGraveyard1.classList.add("toGraveyardDiv");
            var divButtonDisplayGraveyard2 = document.createElement("div");
            var buttonDisplayGraveyard = document.createElement("button");
            buttonDisplayGraveyard.innerHTML = "Oo";
            buttonDisplayGraveyard.classList.add("toGraveyardButton");
            if (graveId == "graveyardId") {
                buttonDisplayGraveyard.setAttribute('onclick', 'displayGrave(\"me\");');
            } else {
                buttonDisplayGraveyard.setAttribute('onclick', 'displayGrave(\"you\");');
            }

            graveZone.appendChild(cardDiv);
            
            divButtonDisplayGraveyard2.appendChild(buttonDisplayGraveyard);
            divButtonDisplayGraveyard1.appendChild(divButtonDisplayGraveyard2);
            graveZone.appendChild(divButtonDisplayGraveyard1);
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