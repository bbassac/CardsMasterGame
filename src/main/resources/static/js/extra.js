
function displayOppExtra(oppPlayerId){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+oppPlayerId+"/extra", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var result = decodeURIComponent(xhttp.responseText);

    document.getElementById("extraOppId").textContent = result ;
}

function displayExtraArea(currentPlayerId,areaId){
    var divDice = document.createElement("div");
    //text area
    var textArea = document.createElement("INPUT");
    textArea.setAttribute("id","extraAreaId");
    textArea.size = 11;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentPlayerId+"/extra", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var result =decodeURIComponent(xhttp.responseText);
    textArea.value = result;

    textArea.setAttribute('onkeypress','updateExtra(event,this.value);');
    divDice.appendChild(textArea);

    var diceArea = document.getElementById(areaId);
    diceArea.innerHTML="";
    diceArea.appendChild(divDice);
}

function updateExtra(event,value) {
    if (event.keyCode === 13) {
        var currentPlayerId = document.getElementById("currentPlayerId").value;
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", encodeURIComponent("player/" + currentPlayerId + "/extra/" + value), false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    }
}