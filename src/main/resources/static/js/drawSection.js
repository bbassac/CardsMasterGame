

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
    img.hspace = 1;
    var src = document.getElementById(id);
    src.innerHTML = '';
    var div = document.createElement("div");
    src.appendChild(div);
    if(id=='currentEnvironment'){
        img.setAttribute('onclick','showCardPopin(this.src);');
    }
    div.appendChild(img);
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
    }else if (id=="invocations"){

        img.setAttribute('title', "Piocher une carte");
        img.setAttribute('onclick','pickInvocation(document.getElementById(\'selectInvocations\').value);');

        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "stack/INVOCATIONS", false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        var cards = JSON.parse(xhttp.responseText);
        var selectList = document.createElement("select");
        selectList.id = "selectInvocations";

        div.appendChild(selectList);
        for (var i=0; i< cards.length;i++){
            var option = document.createElement("option");
            option.value = cards[i].id;
            option.tag=cards[i].path;
            option.text = cards[i].path.substring(14);
            selectList.appendChild(option);
        }

        var buttonDisplayInvoc = document.createElement("button");
        buttonDisplayInvoc.innerHTML = "Display Invocation";
        buttonDisplayInvoc.id = "buttonDisplayInvoc"
        div.appendChild(buttonDisplayInvoc);
        buttonDisplayInvoc.setAttribute('onclick', 'displayInvocation()');
    }
}

function displayInvocation() {
	var selectBox = document.getElementById('selectInvocations');
	var imgPath = 'img' + encodeURI(selectBox.options[selectBox.selectedIndex].tag); 
	//displayPoP(imgPath);
	showCardPopin(imgPath);
}

function pickInvocation(cardId){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentPlayerId+"/invocations/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshBoard();
}