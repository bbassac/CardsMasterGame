/**
 * Gestion du zoom / dézoom d'une carte au passage de la souris
 */

const TRANSLATE_TOP_LEFT = 1;
const TRANSLATE_TOP = 2;
const TRANSLATE_TOP_RIGHT = 3;
const TRANSLATE_RIGHT = 4;
const TRANSLATE_DOWN_RIGHT = 5;
const TRANSLATE_DOWN = 6;
const TRANSLATE_DOWN_LEFT = 7;
const TRANSLATE_LEFT = 8;
const TRANSLATE_CENTER = 9;

const zoom = 2;
 
 /**
 * Applique un zoom sur la carte d'environnement
 */
function zoomCard(cardImg, translateMode) {

	if (cardImg) {
	
		if (translateMode == null) {
			translateMode = TRANSLATE_CENTER;
		}
	
		var divToZoom = cardImg.parentElement;
		
		if (divToZoom) {
			cardImg = divToZoom.children[0];
		}
		
		if (cardImg) {
	
			var sizeChange = {
				oldHeight: cardImg.height,
				newHeight: cardImg.height * zoom,
				oldWidth: cardImg.width,
				newWidth: cardImg.width * zoom			
				};
			
			var moveX = 0;
			var moveY = 0;
			
			
			if (translateMode == TRANSLATE_TOP_LEFT) {
				moveX = sizeChange.oldWidth - sizeChange.newWidth;
				moveY = sizeChange.oldHeight - sizeChange.newHeight;
			
			} else if (translateMode == TRANSLATE_TOP) {
				moveX = (sizeChange.oldWidth - sizeChange.newWidth) / 2;
				moveY = sizeChange.oldHeight - sizeChange.newHeight;
			
			} else if (translateMode == TRANSLATE_TOP_RIGHT) {
				moveY = sizeChange.oldHeight - sizeChange.newHeight;			

			} else if (translateMode == TRANSLATE_RIGHT) {
				moveY = -(sizeChange.newHeight - sizeChange.oldHeight) / 2;
							
			} else if (translateMode == TRANSLATE_DOWN_RIGHT) {
					
			} else if (translateMode == TRANSLATE_DOWN) {
				moveX = (sizeChange.oldWidth - sizeChange.newWidth) / 2;
			
			} else if (translateMode == TRANSLATE_DOWN_LEFT) {
				moveX = (sizeChange.oldWidth - sizeChange.newWidth) / 2;
				moveX = sizeChange.oldWidth - sizeChange.newWidth;
	
			} else if (translateMode == TRANSLATE_LEFT) {
				moveX = sizeChange.oldWidth - sizeChange.newWidth;
				moveY = -(sizeChange.newHeight - sizeChange.oldHeight) / 2;
			
			} else if (translateMode == TRANSLATE_CENTER) {
				moveX = (sizeChange.oldWidth - sizeChange.newWidth) / 2;
				moveY = -(sizeChange.newHeight - sizeChange.oldHeight) / 2;
			}
	
var h1 = window.getComputedStyle(divToZoom).getPropertyValue("height");
var w1 = window.getComputedStyle(divToZoom).getPropertyValue("width");
	
			moveX += getMargin(divToZoom, "top");
			moveY += getMargin(divToZoom, "left");
		
			divToZoom.style.position = "absolute";
			cardImg.style.position = "absolute";
			
			cardImg.style.transform ="translate("+ moveX + "px, " + moveY + "px)";		
			cardImg.style.height = sizeChange.newHeight + "px";
			cardImg.style.width = sizeChange.newWidth + "px";

			divToZoom.style.height = h1;
			divToZoom.style.width = w1;

			divToZoom.style.zIndex = "1000";
			cardImg.style.zIndex = "1000";


var h2 = window.getComputedStyle(divToZoom).getPropertyValue("height");
var w2 = window.getComputedStyle(divToZoom).getPropertyValue("width");

//alert("height = " + h1 + ", " + h2 + ";   width=" + w1 + ", " + w2);

		}		
	}
}

/**
 * Annule le zoom sur la carte d'environnement
 */
function unzoomCard(cardImg) {

	var divToZoom = cardImg.parentElement;
	
	if (divToZoom) {
		cardImg = divToZoom.children[0];
	}
		
	if (cardImg) {
	
		var sizeChange = {
			oldHeight: cardImg,
			newHeight: cardImg.height / zoom,
			oldWidth: cardImg.width,
			newWidth: cardImg.width / zoom			
			};

		cardImg.style.transform ="";		
		cardImg.style.height = sizeChange.newHeight + "px";
		cardImg.style.width = sizeChange.newWidth + "px";
		
		divToZoom.style.position = "relative";
		cardImg.style.position = "relative";

		divToZoom.style.zIndex = "initial";
		cardImg.style.zIndex = "initial";
	}		

}

/**
 * retourne la taille de l'une des marges appliquées à un élément du dom.
 * @param element : élément du dom.
 * @param side : côté de l'élément dont on recherche la taille de la marge. Peut prendre les valeurs "top", "left", "right" ou "down".
 * @return taille de la marge recherchée.
 */
function getMargin(element, side) {

	var result = 0;

	if (element && ((side == "top") || (side == "left") || (side == "right") || (side == "down"))) {
		var mg = window.getComputedStyle(element).getPropertyValue("margin-" + side);
		var n = mg.length;
		result = Number(mg.substring(0, n - 2));
	}
	
	return result;
}