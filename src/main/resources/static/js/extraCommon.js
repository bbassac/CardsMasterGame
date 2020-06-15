
function displayOppExtra(oppPlayerId){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+oppPlayerId+"/extra", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var result = decodeURIComponent(xhttp.responseText);
    document.getElementById('oppMessageIconId').title=OPP_SHARE_MESSAGE;
    document.getElementById("extraOppId").textContent = result ;
}

function displayExtraArea(currentPlayerId,areaId){

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentPlayerId+"/extra", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var result = decodeURIComponent(xhttp.responseText);

    var divArea = document.getElementById(areaId);
    divArea.innerHTML = result;

    document.getElementById('messageIconId').title=SHARE_MESSAGE;

}
