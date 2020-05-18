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

    if ((oldChakra[playerId].count != countChakra) || (countChakra == 0) || (oldChakra[playerId].max != maxChakra)) {
    
    	oldChakra[playerId].count = countChakra;
    	oldChakra[playerId].max = maxChakra;
    	
	    var component = document.getElementById(componentId);
	    component.textContent = "Chakras : " + xhttp.responseText;
	    if (countChakra> maxChakra) {
	        component.style.color="red";
	    }else{
	        component.style.color="black";
	    }
	    
	    if (componentId == "playerChakraId") {
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
    }

}


function updateChakras(newValue){

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/chakra/"+newValue, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    fillChakras(currentPlayerId,"playerChakraId");
}
