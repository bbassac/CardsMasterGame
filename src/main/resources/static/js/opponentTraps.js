function fillNbTraps(oppPlayerId, componentId,trapSize) {

	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/" + oppPlayerId + "/traps", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var traps = JSON.parse(xhttp.responseText);
    var nbTraps = traps.length;

    if (nbTraps !== oldNbTrapsOpp) {
        oldNbTrapsOpp = nbTraps;
        
        var component = document.getElementById(componentId);
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

