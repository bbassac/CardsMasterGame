function displayPopinMessages() {
	
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentPlayerId+"/extra", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var result = decodeURIComponent(xhttp.responseText);
	
	showMessagesPopin();
	
	var input = document.getElementById("popinMessagesInput");
	input.setAttribute('onkeyUp','updateExtra(event, this.value);');
	input.value = result;
	input.focus();
	input.select();
	
}

function updateExtra(event, value) {

    if (event.keyCode === 13) {
    	
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", encodeURIComponent("player/" + currentPlayerId + "/extra/" + value), false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        
        document.getElementById("extraPlayerId").innerHTML = value;
        
        hideMessagesPopin();
    }
    
}