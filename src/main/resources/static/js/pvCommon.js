function fillPVs(playerId,componentId) {
    
	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/pvs", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    var component = document.getElementById(componentId);
    component.textContent =  xhttp.responseText;
    if (componentId=="playerPvsId"){

        component.title=PLAYER_PV;

    	var div = document.getElementById("playerPvLessPointId");
    	div.tag = parseInt(xhttp.responseText)-1;
    	div.setAttribute('onclick','updatePvs(this.tag);');

        div = document.getElementById("playerPvMorePointId");
        div.tag = parseInt(xhttp.responseText)+1;
        div.setAttribute('onclick','updatePvs(this.tag);');
    }else {
        component.title=OPP_PV;
    }
}

function updatePvs(newValue){

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/pvs/"+newValue, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    fillPVs(currentPlayerId,"playerPvsId");
}