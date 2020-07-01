/**
 * Cache pour les images des cartes 
 */

class CardCache {

	constructor() {
		this.cache = {};
	}

	getImageCard(id, path) {
		
		var imgCard = this.cache[id];
		
		if (! imgCard) {
			imgCard = loadImage(encodeURI("img/" + path));
			this.cache[id] = imgCard;
		}
		
		return imgCard;
	}
	
}