var drawImageHeight = 100;

function getCurrentEnvironmentCard() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "stack/ENVIRONNEMENT", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    return JSON.parse(xhttp.responseText)[0].path;
}


function fillDrawBoard(playerId, id, image){
    var img = document.createElement("img");
    img.src = encodeURI(image);
    img.height = drawImageHeight;
    img.hspace = 1;
    var src = document.getElementById(id);
    src.innerHTML = '';
    var div = document.createElement("div");
    src.appendChild(div);
    if(id=='currentEnvironment'){
        img.setAttribute('onclick','displayPoP(this.src);');
    }
    div.appendChild(img);
    if (id=="draw"){
        // 1. Create the button
        var button = document.createElement("button");
        button.innerHTML = "Piocher";
        div.appendChild(button);

        // 3. Add event handler
        button.addEventListener ("click", function() {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "player/"+playerId+"/newcard", false);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
            refreshBoard();
        });
    }else if (id=="invocations"){
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
            option.text = cards[i].path;
            selectList.appendChild(option);
        }

        var buttonPickInvoc = document.createElement("button");
        buttonPickInvoc.innerHTML = "Piocher Invocation";
        div.appendChild(buttonPickInvoc);
        buttonPickInvoc.setAttribute('onclick','pickInvocation(document.getElementById(\'selectInvocations\').value);');

        var buttonDisplayInvoc = document.createElement("button");
        buttonDisplayInvoc.innerHTML = "Display Invocation";
        div.appendChild(buttonDisplayInvoc);
        //buttonDisplayInvoc.setAttribute('onclick','displayPop(document.getElementById(\'selectInvocations\').options[document.getElementById(\'selectInvocations\').value].text);');
        buttonDisplayInvoc.setAttribute('onclick','displayPoP(\'img\' + encodeURI(document.getElementById(\'selectInvocations\').options[document.getElementById(\'selectInvocations\').selectedIndex].text));');
    }
}

function pickInvocation(cardId){
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+currentPlayerId+"/invocations/"+cardId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    refreshBoard();
}