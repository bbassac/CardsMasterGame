
function getAffiniteImg() {
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    //affinite
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentPlayerId+"/affinite", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var result = decodeURIComponent(xhttp.responseText);

    var imgAffinite = document.createElement("img");
    imgAffinite.id="affiniteImg";
    imgAffinite.src = getImgPathFromAffinite(result);
    return imgAffinite;
}

function displayOppAffinite(){
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var currentOppId = Math.abs(1-currentPlayerId);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentOppId+"/affinite", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var affinite = decodeURIComponent(xhttp.responseText);

    var div = document.getElementById("affiniteOppId");
    if (document.getElementById("affiniteOppImg") == null || document.getElementById("affiniteOppImg").affinite != affinite ) {
        div.innerHTML="";
        var img = document.createElement("img");
        img.src = getImgPathFromAffinite(affinite);
        img.id = "affiniteOppImg";
        img.affinite = affinite;
        div.appendChild(img);
    }

}

function getImgPathFromAffinite(affinite){
    return "img/affinite/"+affinite+".png";
}