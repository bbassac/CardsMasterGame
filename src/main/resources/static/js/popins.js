var openedPopins = [];

/**
 * Affiche la "popin" de sélection de carte
 *
 */
function showCardSelectPopin(background) {
	
	var popinDivs = getPopinDivs("popinCardSelectDiv");
	
	if (popinDivs.contentDiv) {
		popinDivs.contentDiv.style.backgroundImage = background; 
		showPopin("popinCardSelectDiv");
	}
}

/**
 * Masque la "popin" de sélection de carte
 *
 */
function hideCardSelectPopin() {
	hidePopin("popinCardSelectDiv");
}

/**
 * Affiche la "popin" de carte
 *
 */
function showCardPopin(src) {

	var img = document.getElementById("popinCardImg");
	img.src = src;

	showPopin("popinCardDiv");
}

/**
 * Masque la "popin" de cimetière
 *
 */
function hideCardPopin() {
	hidePopin("popinCardDiv");
}


/**
 * Affiche la "popin" de lancement des dés
 *
 */
function showDicesPopin() {
	showPopin("popinDicesDiv");
}

/**
 * Masque la "popin" de lancement des dés
 *
 */
function hideDicesPopin() {
	hidePopin("popinDicesDiv");
}


/**
 * Affiche la "popin" des messages
 *
 */
function showMessagesPopin() {
	showPopin("popinMessagesDiv");
}

/**
 * Masque la "popin" des messages
 *
 */
function hideMessagesPopin() {
	hidePopin("popinMessagesDiv");
}

/**
 * Masque toutes les popins
 *
 */
function hideAllPopins() {
	while (openedPopins.length > 0) {
		hidePopin(openedPopins[0]);
	}
}

/**
 * Affiche une "popin" en mode div par dessus les autres éléments de la page
 * + un "grisage" de la page derrière
 *
 * @popinDivId : popin à afficher
 *
 */
function showPopin(popinDivId) {

	var popinDivs = getPopinDivs(popinDivId);
	
	if (popinDivs.mainDiv && popinDivs.greyBackDiv && popinDivs.contentDiv) {

		openedPopins.push(popinDivId);
		
		popinDivs.mainDiv.style.display = 'block';
		
		// affichage du gris de fond
		popinDivs.greyBackDiv.style.height = document.documentElement.scrollHeight + "px";
		popinDivs.greyBackDiv.style.zIndex = 100 + openedPopins.length;
		
		// affichage de la popin
		popinDivs.contentDiv.style.zIndex = 101 + openedPopins.length;
	}
}

/**
 * Masque la "popin"
 *
 * @popinDivId : popin à masquer
 *
 */
function hidePopin(popinDivId) {

	// supression de la popin du tableau des popins ouvertes
	var popinIndex = openedPopins.findIndex(popinId => popinId == popinDivId);
	if (popinIndex > 0) {
		openedPopins.splice(popinIndex, 1)
	}

	var popinDivs = getPopinDivs(popinDivId);

	if (popinDivs.mainDiv && popinDivs.greyBackDiv && popinDivs.contentDiv) {
		popinDivs.mainDiv.style.display = 'none';
	}
	
}

/**
 * Recherche les 3 divs principaux composant une popin et les retourne dans une structure.
 * @param popinDivId : id de la popin donc on recherche les div.
 * @returns : structure référençant les 3 div.
 */
function getPopinDivs(popinDivId) {

	var popinDivs = {};
	
	popinDivs.mainDiv = document.getElementById(popinDivId);
	var elements =  popinDivs.mainDiv.childNodes;
	
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].tagName && elements[i].tagName.toUpperCase() === "DIV") {
			if (elements[i].className === "popin_gray_back") {
				popinDivs.greyBackDiv = elements[i];			
			} else {
				popinDivs.contentDiv = elements[i];
			}
		}
	}
	
	return popinDivs;
}
