/**
 * Cache de domCard
 * 
 * Permets de maintenir une liste d'instance unique de domCard et de pouvoir facilement
 * retrouver ces instance par l'id de la carte.
 */

// Le cache
const cacheDomCards = {};

/**
 * Retourne le domCard correspondant à un card.
 * Si le domCard n'est pas présent dans le cache il sera construit et ajouté au cache. 
 * 
 * @param card carte dont on veut le domCard correspondant
 * @param cardImageHeight hauteur de l'image de la carte
 * @param drawMode mode d'affichage de la carte (pile ou plateau)
 * @returns
 */
function getDomCard(card, cardImageHeight, drawMode) {
	
	var domCard = null;
	var id = card.id;
	
	//if (cacheDomCards.hasOwnProperty(id)) {
	//	domCard = cacheDomCards[id];
	//} else {
		domCard = new DomCard(card, cardImageHeight, drawMode);
		cacheDomCards[id] = domCard;
	//}
	
	return domCard;
}

/**
 * Retourne le domCard correspondant à un id de card.
 * Si le domCard n'est pas présent dans le cache, null sera retourné. 
 * 
 * @param id id de la carte dont on veut le domCard correspondant
 * @returns domCard correspondant à l'id si il existe, null sinon.
 */
function getDomCardById(id) {

	var domCard = null;
	
	if (cacheDomCards.hasOwnProperty(id)) {
		domCard = cacheDomCards[id];
	}
	
	return domCard;
}