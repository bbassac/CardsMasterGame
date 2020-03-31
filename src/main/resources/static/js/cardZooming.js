/**
 * Gestion du zoom / dézoom d'une carte au passage de la souris
 */

const TRANSLATE_UP_LEFT = 1;
const TRANSLATE_UP = 2;
const TRANSLATE_UP_RIGHT = 3;
const TRANSLATE_RIGHT = 4;
const TRANSLATE_DOWN_RIGHT = 5;
const TRANSLATE_DOWN = 6;
const TRANSLATE_DOWN_LEFT = 7;
const TRANSLATE_LEFT = 8;
const TRANSLATE_CENTER = 9;

const defaultZoom = 2;
 
function setZooming(cardImg, translateMode, zoom) {
	
	cardImg.onmouseenter = function() {
		_zoomCard(cardImg, translateMode, zoom);
	};
	
	cardImg.onmouseleave = function() {
		_unzoomCard(cardImg);
	};
} 
 
 /**
 * Applique un zoom sur la carte d'environnement
 */
function _zoomCard(cardImg, translateMode, zoom) {

	if (cardImg) {
	
		if (translateMode == null) {
			translateMode = TRANSLATE_CENTER;
		}
	
		if (zoom == null) {
			zoom = defaultZoom;
		}

		var divToZoom = cardImg.parentElement;
		
		var sizeChange = {
			oldHeight: cardImg.height,
			newHeight: cardImg.height * zoom,
			oldWidth: cardImg.width,
			newWidth: _getSizedAttribute(cardImg, "width") * zoom			
			};
		
		var moveX = 0;
		var moveY = 0;
		
		if (translateMode == TRANSLATE_UP_LEFT) {
			moveX = -sizeChange.newWidth;
			moveY = sizeChange.oldHeight - sizeChange.newHeight;
		
		} else if (translateMode == TRANSLATE_UP) {
			moveX = (sizeChange.oldWidth - sizeChange.newWidth) / 2;
			moveY = sizeChange.oldHeight - sizeChange.newHeight;
		
		} else if (translateMode == TRANSLATE_UP_RIGHT) {
			moveY = sizeChange.oldHeight - sizeChange.newHeight;			

		} else if (translateMode == TRANSLATE_RIGHT) {
			moveY = -(sizeChange.newHeight - sizeChange.oldHeight) / 2;
						
		} else if (translateMode == TRANSLATE_DOWN_RIGHT) {
				
		} else if (translateMode == TRANSLATE_DOWN) {
			moveX = (sizeChange.oldWidth - sizeChange.newWidth) / 2 + _getSizedAttribute(divToZoom, "margin-left") - _getSizedAttribute(divToZoom, "margin-right");
			moveY = _getSizedAttribute(divToZoom, "margin-top");
		
		} else if (translateMode == TRANSLATE_DOWN_LEFT) {
			moveX = sizeChange.oldWidth - sizeChange.newWidth;

		} else if (translateMode == TRANSLATE_LEFT) {
			moveX = sizeChange.oldWidth - sizeChange.newWidth;
			moveY = -(sizeChange.newHeight - sizeChange.oldHeight) / 2;
		
		} else if (translateMode == TRANSLATE_CENTER) {
			moveX = (sizeChange.oldWidth - sizeChange.newWidth) / 2 + _getSizedAttribute(divToZoom, "margin-left") - _getSizedAttribute(divToZoom, "margin-right");
			moveY = -(sizeChange.newHeight - sizeChange.oldHeight) / 2;
		}

		divToZoom.init = {};
		divToZoom.init.margin = divToZoom.style.margin;
		divToZoom.init.marginTop = divToZoom.style.marginT;
		divToZoom.init.marginLeft = divToZoom.style.marginLeft;
		divToZoom.init.marginRight = divToZoom.style.marginRight;
		divToZoom.init.marginBottom = divToZoom.style.marginBottom;
		divToZoom.init.height = divToZoom.style.height;
		divToZoom.init.width = divToZoom.style.width;
		divToZoom.init.position = divToZoom.style.position; 
		divToZoom.init.zIndex = divToZoom.style.zIndex;

		cardImg.init = {};
		cardImg.init.position = cardImg.style.position; 
		cardImg.init.zIndex = cardImg.style.zIndex;
		cardImg.init.transform = cardImg.style.transform;
		cardImg.init.height = cardImg.style.height;
		cardImg.init.width = cardImg.style.width;

		divNewWidth = _getSizedAttribute(divToZoom, "width")
			+ _getSizedAttribute(divToZoom, "margin-left")
			+ _getSizedAttribute(divToZoom, "margin-right");
	
		divNewHeight = _getSizedAttribute(divToZoom, "height")
			+ _getSizedAttribute(divToZoom, "margin-top")
			+ _getSizedAttribute(divToZoom, "margin-bottom");


		divToZoom.style.position = "relative";
		cardImg.style.position = "absolute";

		// Application des transformation du div
		divToZoom.style.zIndex = "1000";
		divToZoom.style.width = divNewWidth + "px";
		divToZoom.style.height = divNewHeight + "px";

		// Application des transformation du img
		cardImg.style.zIndex = "1000";
		cardImg.style.transform ="translate("+ moveX + "px, " + moveY + "px)";		
		cardImg.style.height = sizeChange.newHeight + "px";
		cardImg.style.width = sizeChange.newWidth + "px";
	}		
}

/**
 * Annule le zoom sur la carte d'environnement
 */
function _unzoomCard(cardImg) {

	if (cardImg) {
	
		var divToZoom = cardImg.parentElement;
		
		divToZoom.style.position = divToZoom.init.position;
		divToZoom.style.zIndex = divToZoom.init.zIndex;
		divToZoom.style.margin = divToZoom.init.margin;
		divToZoom.style.marginTop = divToZoom.init.marginTop;
		divToZoom.style.marginLeft = divToZoom.init.marginLeft;
		divToZoom.style.marginRight = divToZoom.init.marginRight;
		divToZoom.style.marginBottom = divToZoom.init.marginBottom;
		divToZoom.style.width = divToZoom.init.width;
		divToZoom.style.height = divToZoom.init.height;

		cardImg.style.position = cardImg.init.position; 
		cardImg.style.zIndex = cardImg.init.zIndex;
		cardImg.style.transform = cardImg.init.transform;
		cardImg.style.height = cardImg.init.height;
		cardImg.style.width = cardImg.init.width;
	}		

}

/**
 * retourne la taille de l'une des marges appliquées à un élément du dom.
 * @param element : élément du dom.
 * @param side : côté de l'élément dont on recherche la taille de la marge. Peut prendre les valeurs "top", "left", "right" ou "down".
 * @return taille de la marge recherchée.
 */
function _getSizedAttribute(element, attribute) {

	var mg = window.getComputedStyle(element).getPropertyValue(attribute);
	var n = mg.length;
	return Number(mg.substring(0, n - 2));
}