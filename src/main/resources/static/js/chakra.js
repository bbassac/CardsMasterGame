
function fillChakras(playerId,componentId) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/chakra", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

    var xhttpMaxChakra = new XMLHttpRequest();
    xhttpMaxChakra.open("GET", "maxchakra", false);
    xhttpMaxChakra.setRequestHeader("Content-type", "application/json");
    xhttpMaxChakra.send();
    var maxChakra = xhttpMaxChakra.responseText;


    var component = document.getElementById(componentId);
    component.textContent = "Chakras : " + xhttp.responseText;
    if (Number(xhttp.responseText)> Number(maxChakra)) {
        component.style.color="red";
    }else{
        component.style.color="black";
    }
    var linebreak = document.createElement("br");
    component.appendChild(linebreak);

    var buttonLessChakra = document.createElement("button");
    buttonLessChakra.innerHTML = "-";
    buttonLessChakra.tag = parseInt(xhttp.responseText)-1;
    buttonLessChakra.setAttribute('onclick','updateChakras(this.tag);');
    component.appendChild(buttonLessChakra);

    var buttonMoreChakra = document.createElement("button");
    buttonMoreChakra.id = "ButtonMoreChakraID";
    buttonMoreChakra.innerHTML = "+";
    buttonMoreChakra.tag = parseInt(xhttp.responseText)+1;
    buttonMoreChakra.setAttribute('onclick','updateChakras(this.tag);');
    component.appendChild(buttonMoreChakra);

}


function updateChakras(newValue){
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/chakra/"+newValue, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    fillChakras(currentPlayerId,"playerChakraId");
}
