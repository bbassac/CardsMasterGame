function fillDraw(playerId){

    var src = document.getElementById("draw");
    src.innerHTML = '';

    var img = document.createElement("img");
    img.src = CARD_IMG_BACK_DRAW;
    img.height = drawImageHeight;
    img.id = "imgDraw";
    img.classList.add("imgDraw");
    img.setAttribute('title', PICK_A_CARD);
    img.draggable = false;
    
    img.addEventListener ("click", function() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "player/"+playerId+"/newcard", false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        
        handZone.fill(playerId);
    });
    
    src.appendChild(img);
}