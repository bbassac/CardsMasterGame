
function fillPVs(playerId,componentId) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/pvs", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var component = document.getElementById(componentId);
    component.textContent =  "Player Pvs : " + xhttp.responseText;
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
    }else {
        //Opponent
        var xhttpChakras = new XMLHttpRequest();
        xhttpChakras.open("GET", "player/"+playerId+"/chakra", false);
        xhttpChakras.setRequestHeader("Content-type", "application/json");
        xhttpChakras.send();



        var xhttpMaxChakra = new XMLHttpRequest();
        xhttpMaxChakra.open("GET", "maxchakra", false);
        xhttpMaxChakra.setRequestHeader("Content-type", "application/json");
        xhttpMaxChakra.send();
        var maxChakra = xhttpMaxChakra.responseText;


        var component = document.getElementById(componentId);
        var capsule = document.createElement("span");
        var componentChakra = document.createTextNode("Chakras : " + xhttpChakras.responseText);
        if (Number(xhttpChakras.responseText)> Number(maxChakra)) {
            capsule.style.color="red";
        }else{
            capsule.style.color="black";
        }
        capsule.appendChild(componentChakra);

        component.appendChild(capsule);
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