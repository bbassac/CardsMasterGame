

function getCurrentEnvironmentCard() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "stack/ENVIRONNEMENT", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    return JSON.parse(xhttp.responseText)[0].path;
}


function fillDrawBoard(playerId, id, image,drawImageHeight){
    var img = document.createElement("img");
    img.src = encodeURI(image);
    img.height = drawImageHeight;
    img.id = "img" + id;
    img.style.marginLeft="5px";
    img.style.marginTop="2px";
    var src = document.getElementById(id);
    src.innerHTML = '';
    var div = document.createElement("div");
    src.appendChild(div);
    div.appendChild(img);
    if(id=='currentEnvironment'){
        img.setAttribute('onclick','showCardPopin(this.src);');
        img.style.marginLeft="53px";
        manageAffinite();
    }
    if (id=="draw"){
        // 3. Add event handler
        img.setAttribute('title', "Piocher une carte");
        img.addEventListener ("click", function() {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "player/"+playerId+"/newcard", false);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
            refreshBoard();
        });
    }
}