function fillDiceArea(currentPlayerId,diceId){

	var textArea = document.getElementById("diceAreaId");
    if (textArea == null) {
	    var textArea = document.createElement("INPUT");
	    textArea.id = "diceAreaId";
	    textArea.size = 8;
	    textArea.setAttribute('onkeypress','throwDice(event,this.value);');

	    var diceArea = document.getElementById(diceId);
	    diceArea.appendChild(textArea);
    }
    
    textArea.value = "";
}

function refreshLastDiceThrow(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "lastdice" , false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var result = JSON.parse(xhttp.responseText);
    var detailedResult = result.value;
    if (result.detail != null){
        detailedResult += ("(" + result.detail + ")");
    }
    
    var textArea = document.getElementById("diceResultId");
    if (textArea) {
    	textArea.textContent = detailedResult ;
    }
}

function throwDice(event,diceExp){
    if (event.keyCode === 13) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "dice/" + diceExp, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        var result = JSON.parse(xhttp.responseText);
        var detailedResult = result.value;
        if (result.detail != null){
            detailedResult += ("(" + result.detail + ")");
        }
        document.getElementById("diceResultId").value = detailedResult ;
    }
}