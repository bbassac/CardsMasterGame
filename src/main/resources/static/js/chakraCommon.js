var oldChakra = [{count:-1, max:-1}, {count:-1, max:-1}];

function fillChakras(playerId,componentId) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/chakra", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var countChakra = Number(xhttp.responseText);
    
    var xhttpMaxChakra = new XMLHttpRequest();
    xhttpMaxChakra.open("GET", "maxchakra", false);
    xhttpMaxChakra.setRequestHeader("Content-type", "application/json");
    xhttpMaxChakra.send();
    var maxChakra = Number(xhttpMaxChakra.responseText);

    var component = document.getElementById(componentId);
    component.textContent = xhttp.responseText;
    if (countChakra > maxChakra) {
        component.style.color="red";
    }else{
        component.style.color="white";
    }
    
	oldChakra[playerId].count = countChakra;
	oldChakra[playerId].max = maxChakra;
	
    if (componentId == "playerChakraId") {
        component.title=PLAYER_CHAKRA;

    	var div = document.getElementById("playerChakraLessPointId");
    	div.tag = parseInt(xhttp.responseText)-1;
    	div.setAttribute('onclick','updateChakras(this.tag);');
	
    	div = document.getElementById("playerChakraMorePointId");
    	div.tag = parseInt(xhttp.responseText)+1;
    	div.setAttribute('onclick','updateChakras(this.tag);');
    }else {
        component.title = OPP_CHAKRA;
    }

}


function updateChakras(newValue){

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/chakra/"+newValue, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    fillChakras(currentPlayerId,"playerChakraId");
}
