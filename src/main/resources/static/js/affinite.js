function manageAffinite(){
    displayOppAffinite();
    displayAffiniteJoueur();
  
}


function displayAffiniteJoueur() {
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    //affinite
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentPlayerId+"/affinite", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var affiniteCard = JSON.parse(xhttp.responseText);

    var divToolTip = document.createElement("div");
    divToolTip.classList.add("tooltip");

    var imgAffinite = document.createElement("img");
    imgAffinite.id="affiniteImg";
    imgAffinite.src = "img" + affiniteCard.path;
    imgAffinite.setAttribute('onclick','showCardPopin(this.src);');
    var spanToolTipText = document.createElement("span");
    spanToolTipText.classList.add("tooltiptext");

    divToolTip.appendChild(imgAffinite);
    divToolTip.appendChild(spanToolTipText);

    var divAffinite = document.getElementById("affiniteId")  ; 
    divAffinite.innerHTML = "";
    divAffinite.appendChild(divToolTip);
}

function displayOppAffinite(){
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    var currentOppId = Math.abs(1-currentPlayerId);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentOppId+"/affinite", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var affiniteCard = JSON.parse(xhttp.responseText);

    var div = document.getElementById("affiniteOppId");
    if (document.getElementById("affiniteOppImg") == null ||
        document.getElementById("affiniteOppImg").id !== affiniteCard.id ) {
        div.innerHTML="";
        var divToolTip = document.createElement("div");
        divToolTip.classList.add("tooltip");

        var imgAffinite = document.createElement("img");
        imgAffinite.src = "img"+affiniteCard.path;
        imgAffinite.id = "affiniteOppImg";
        imgAffinite.affinite = affiniteCard.id;
        imgAffinite.setAttribute('onclick','showCardPopin(this.src);');
        var spanToolTipText = document.createElement("span");
        spanToolTipText.classList.add("tooltiptext");

        divToolTip.appendChild(imgAffinite);
        divToolTip.appendChild(spanToolTipText)
        div.appendChild(divToolTip);
    }


}