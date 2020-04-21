function fillEnvironment() {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "stack/ENVIRONNEMENT", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var imgPath = JSON.parse(xhttp.responseText)[0].path;
    
    var src = document.getElementById("currentEnvironment");
    src.innerHTML = '';

	var card = {
		id: -1,
		path: imgPath,
		dammagePoints: 0,
		activated: false,
		used: false
	};

    var domCard = new DomCard(card, drawImageHeight, CARD_DRAW_MODES_DICE);
	src.appendChild(domCard.divCard);

}