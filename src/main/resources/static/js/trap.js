
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
