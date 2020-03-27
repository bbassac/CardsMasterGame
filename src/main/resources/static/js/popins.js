/**
 * 
 */
 

/**
 * Affiche la "popin" de cimetière
 *
 */
function showGraveyardPopin() {
	showPopin("popinGraveyardDiv");
}

/**
 * Masque la "popin" de cimetière
 *
 */
function hideGraveyardPopin() {
	hidePopin("popinGraveyardDiv");
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
	hideGraveyardPopin();
	hideCardPopin();
}

/**
 * Affiche une "popin" en mode div par dessus les autres éléments de la page
 * + un "grisage" de la page derrière
 *
 * popinDivId : popin à afficher
 *
 */
function showPopin(popinDivId) {

	var backgroundDiv = document.getElementById("popinGrayBackDiv");
	if (backgroundDiv) {
		backgroundDiv.style.height = document.documentElement.scrollHeight + "px";
		backgroundDiv.style.display = 'block';
	}		

	var popinDiv = document.getElementById(popinDivId);
	if (popinDiv) {
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

	var backgroundDiv = document.getElementById("popinGrayBackDiv");
	if (backgroundDiv) {
		backgroundDiv.style.display = 'none';
	}		

	var popinDiv = document.getElementById(popinDivId);
	if (popinDiv) {
		popinDiv.style.display = 'none';
	}

}

