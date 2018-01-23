document.addEventListener('DOMContentLoaded', function() {
    refreshBoard();
}, false);


function getUrlValue(param) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+param+"/pvs", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    return xhttp.responseText;

}


function refreshBoard(){
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    document.getElementById("playerPvsId").textContent = getUrlValue(currentPlayerId);
    document.getElementById("oppPvsId").textContent = getUrlValue(Math.abs(1-currentPlayerId));
    fillDeckImage("draw","img/Back-Draw.png");
    fillDeckImage("invocations","img/Back-Select.png");
    fillDeckImage("environments","img/Back-Select3.png");
    fillDeckImage("currentEnvironment","img" + getCurrentEnvironmentCard());

}
function getCurrentEnvironmentCard() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "stack/ENVIRONNEMENT", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    return JSON.parse(xhttp.responseText)[0].path;
}


function fillDeckImage(id,image){
    var img = document.createElement("img");
    img.src = encodeURI(image);
    img.height = 100;
    img.hspace = 60;
    var src = document.getElementById(id);
    src.innerHTML = '';
    src.appendChild(img);
}