
function displayOppExtra(oppPlayerId){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+oppPlayerId+"/extra", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var result = decodeURIComponent(xhttp.responseText);

    document.getElementById("extraOppId").textContent = result ;
}

function displayExtraArea(currentPlayerId,areaId){

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentPlayerId+"/extra", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var result = decodeURIComponent(xhttp.responseText);
/*
    var textArea = document.getElementById("extraAreaId");
    if (textArea == null) {
    	textArea = document.createElement("INPUT");
	    textArea.setAttribute("id","extraAreaId");
	    textArea.size = 10;
	    textArea.setAttribute('onkeypress','updateExtra(event,this.value);');

        var divArea = document.getElementById(areaId);
        divArea.innerHTML="";
	    divArea.appendChild(textArea);
    }

    textArea.value = result;*/
    
    var divArea = document.getElementById(areaId);
    divArea.innerHTML = result;

}
/*
function updateExtra(event,value) {
    if (event.keyCode === 13) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", encodeURIComponent("player/" + currentPlayerId + "/extra/" + value), false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    }
}*/