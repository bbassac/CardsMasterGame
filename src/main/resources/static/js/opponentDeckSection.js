function needAdd(card,slot){
    if (!slot){
        return true;
    }
    if (card.id != slot.firstChild.id){
        return true;
    }
}

function needDelete(card,slot){
    if (!slot){
        return false;
    }
    return card.id != slot.firstChild.id;
}

function needUpdate(card,slot){
    if (!slot){
        return false;
    }

    if (card.id == slot.firstChild.id){
        console.log("Same card");
        if (card.activated != slot.firstChild.tag) {
            return true;
        }
        if (card.dammagePoints != slot.children[1].innerText){
            return true;
        }
    }
    return false;

}

function cleanAllIfNeeded(cards, src) {
    
	if (cards.length != src.childNodes.length) {
		src.innerHTML = '';
	}
	
	for (var i = 0; i < cards.length; i++) {

        var indexedSlot = src.childNodes[i];

        if (cards.length != src.childNodes.length) {
            src.innerHTML = '';
            break;
        }

        if (needDelete(cards[i], indexedSlot)) {
            src.innerHTML = '';
            break;
        } else if (needUpdate(cards[i], indexedSlot)) {
            src.innerHTML = '';
            break;
        }
    }
}

function fillDeckOpp(playerId,section,stackName,gameImageHeight){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/"+stackName, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    //Ici j'ai toutes les cartes que je dois afficher
    var cards = JSON.parse(xhttp.responseText);
    //Je récupère le bloc contenant toutes les cartes
    var src = document.getElementById(section);

    cleanAllIfNeeded(cards, src);

    for (var i=0; i< cards.length;i++){

        var indexedSlot = src.childNodes[i];

        if (needDelete(cards[i], indexedSlot)){
            console.log("Need Delete");
            src.removeChild(indexedSlot);
        }else if (needUpdate(cards[i], indexedSlot)){
            console.log("Need Update");
        }else if (needAdd(cards[i], indexedSlot)){
            //Si carte manquante l'ajouter
            // Je crée un div pour un bloc de carte
            var cardDiv = document.createElement("div");
            cardDiv.setAttribute("id", "divOpp-" + cards[i].id);
            var img = document.createElement("img");
            img.src = "img/" + encodeURI(cards[i].path);
            img.height = gameImageHeight;
            img.hspace = 5;
            img.id=cards[i].id;
            img.title = cards[i].id;
            img.tag = cards[i].activated;
            img.setAttribute('onclick', 'showCardPopin(this.src);');

            //J'ajoute l'image au bloc
            cardDiv.appendChild(img);

            //Si besoin je tourne la carte
            if (cards[i].activated) {
                img.setAttribute('style', 'transform:rotate(90deg);margin-left:38px;margin-right:38px;'); // the 90deg parameter may be changed to whatever angle you want to rotate to
            }

            if (cards[i].used){
                img.setAttribute("class","usedCard")
            }

            //Je crée un sous-bloc pour l'affichage des dégats
            var div = document.createElement("div");
            var bold = document.createElement("b");
            var nbDmg = document.createTextNode("  " + cards[i].dammagePoints + "  ");
            bold.appendChild(nbDmg);
            bold.style.fontSize = "medium";
            if (cards[i].dammagePoints>0){
                bold.style.color = 'red';
            }
            //Ajout bloc dmg au div
            div.appendChild(bold);
            cardDiv.appendChild(div);

            src.appendChild(cardDiv);
        }


    }
}