function fillDiceArea(currentPlayerId,diceId){

    var diceIconDiv = document.getElementById("diceIconId");
    diceIconDiv.title =DICE;
    diceIconDiv.onclick = (function() { displayPopinDices(); });
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
    	textArea.textContent = ("" + detailedResult).replace(/[ ]/g, '');
    }
}