var openedPopins = [];

/**
 * Affiche la "popin" de sélection de carte
 *
 */
function showCardSelectPopin(background) {
	document.getElementById("popin_cardSelect").style.backgroundImage = background; 
	showPopin("popinCardSelectDiv");
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
 * popinDivId : popin à afficher
 *
 */
function showPopin(popinDivId) {

	openedPopins.push(popinDivId);
	
	var backgroundDiv = document.getElementById("popinGrayBackDiv");
	if (backgroundDiv) {
		backgroundDiv.style.height = document.documentElement.scrollHeight + "px";
		backgroundDiv.style.zIndex = 100 + openedPopins.length;
		backgroundDiv.style.display = 'block';
	}		

	var popinDiv = document.getElementById(popinDivId);
	if (popinDiv) {
		popinDiv.style.zIndex = 101 + openedPopins.length;
		popinDiv.style.display = 'block';
	}
}

/**
 * Affiche une "popin" en mode div par dessus les autres éléments de la page
 * + un "grisage" de la page derrière
 *
 * popinDivId : popin à afficher
 *
 */
function hidePopin(popinDivId) {

	// supression de la popin du tableau des popins ouvertes
	var popinIndex = openedPopins.findIndex(popinId => popinId == popinDivId);
	if (popinIndex > 0) {
		openedPopins.splice(popinIndex, 1)
	}
	
	var backgroundDiv = document.getElementById("popinGrayBackDiv");
	if (backgroundDiv) {
		backgroundDiv.style.display = 'none';
	}		

	var popinDiv = document.getElementById(popinDivId);
	if (popinDiv) {
		popinDiv.style.display = 'none';
	}

}
