
function getAffiniteImg() {
    var currentPlayerId = document.getElementById("currentPlayerId").value;
    //affinite
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentPlayerId+"/affinite", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var result = decodeURIComponent(xhttp.responseText);

    var divToolTip = document.createElement("div");
    divToolTip.classList.add("tooltip");

    var imgAffinite = document.createElement("img");
    imgAffinite.id="affiniteImg";
    imgAffinite.src = getImgPathFromAffinite(result);

    var spanToolTipText = document.createElement("span");
    spanToolTipText.classList.add("tooltiptext");
    spanToolTipText.innerHTML = getRules(result);

    divToolTip.appendChild(imgAffinite);
    divToolTip.appendChild(spanToolTipText);

    return divToolTip;
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
    if (document.getElementById("affiniteOppImg") == null ||
        document.getElementById("affiniteOppImg").affinite !== affinite ) {
        div.innerHTML="";
        var divToolTip = document.createElement("div");
        divToolTip.classList.add("tooltip");

        var img = document.createElement("img");
        img.src = getImgPathFromAffinite(affinite);
        img.id = "affiniteOppImg";
        img.affinite = affinite;

        var spanToolTipText = document.createElement("span");
        spanToolTipText.classList.add("tooltiptext");
        spanToolTipText.innerHTML = getRules(affinite);

        divToolTip.appendChild(img);
        divToolTip.appendChild(spanToolTipText)
        div.appendChild(divToolTip);
    }

}

function getImgPathFromAffinite(affinite){
    return "img/affinite/"+affinite+".png";
}

function getRules(affinite) {
    switch(affinite) {
        case "Feu":
            return "&nbsp;<strong>Feu:</strong><br />"+
                "&nbsp;&nbsp;  - Insensible aux attaques de Feu <br /> "+
                "&nbsp;&nbsp;  - Fort contre le Vent <br /> "+
                "&nbsp;&nbsp;  - Faible contre les attaques d'Eau";

        case "Vent":
            return "&nbsp;<strong>Vent :</strong><br /> "+
                "&nbsp;&nbsp;  - Insensible aux attaques de Vent <br /> "+
                "&nbsp;&nbsp;  - Fort contre la Foudre <br /> "+
                "&nbsp;&nbsp;  - Faible contre les attaques de Feu";

        case "Foudre":
            return "&nbsp;<strong>Foudre :</strong /><br />  "+
                "&nbsp;&nbsp;  - Insensible aux attaques de Foudre <br /> "+
                "&nbsp;&nbsp;  - Fort contre le Spécial <br /> "+
                "&nbsp;&nbsp;  - Faible contre les attaque de Vent";

        case "Special":
            return "&nbsp;<strong>Special :</strong><br />  "+
                "&nbsp;&nbsp;  - Insensible aux attaques Spéciales <br />"+
                "&nbsp;&nbsp;  - Fort contre le Physique <br /> "+
                "&nbsp;&nbsp;  - Faible contre les attaques de Foudre";

        case "Physique":
            return "&nbsp;<strong>Physique :</strong><br /> "+
                "&nbsp;&nbsp;  - Insensible aux attaques Physiques <br /> "+
                "&nbsp;&nbsp;  - Fort contre la Terre <br /> "+
                "&nbsp;&nbsp;  - Faible contre les attaques Spéciales";

        case "Terre":
            return "&nbsp;<strong>Terre :</strong><br /> "+
                "&nbsp;&nbsp;  - Insensible aux attaques de Terre <br /> "+
                "&nbsp;&nbsp;  - Fort contre l'Eau <br /> "+
                "&nbsp;&nbsp;  - Faible contre les attaques Physiques";

        case "Eau":
            return "&nbsp;<strong>Eau :</strong><br /> "+
                "&nbsp;&nbsp;  - Insensible aux attaques d'Eau <br /> "+
                "&nbsp;&nbsp;  - Fort contre le Feu <br /> "+
                "&nbsp;&nbsp;  - Faible contre les attaques de Terre";
        default:
        return ""
    }
}