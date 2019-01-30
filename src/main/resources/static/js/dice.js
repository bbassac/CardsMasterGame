function fillDiceArea(currentPlayerId,diceId){
    var divDice = document.createElement("div");
    //text area
    var textArea = document.createElement("INPUT");
    textArea.setAttribute("id","diceAreaId");
    textArea.size = 7;
    textArea.setAttribute('onkeypress','throwDice(event,this.value);');
    divDice.appendChild(textArea);

    var diceArea = document.getElementById(diceId);
    diceArea.innerHTML="";
    diceArea.appendChild(divDice);
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
    document.getElementById("diceResultId").textContent = "Result :" +detailedResult ;

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
        document.getElementById("diceResultId").textContent = "Result :" +detailedResult ;
    }
}