/**
 * 
 * boardArea.js
 * Fichier js de gestion de scroll par boutons d'une div.
 * 
 * Description :
 * Construit un composant d'affichage de cartes, scrollable par bouton gauche/droite.
 * Ce composant est posé sur un div.
 * Un composant est ici un ensemble de div et d'img empilés.
 * 
 * Fonctionnement :
 * - Prend en entrée 
 * 		- Un div, sur le quel le co.
 * 		- Un thème utilisé pour le rendu graphique.
 * - Y ajoute des éléments du DOM (div, img) pour construire le composant scrollable par bouton.
 * - Masque la bar de scroll horizontale standard.
 * - retourne la zone (le div) où doivent être ajoutées les cartes.
 * - IMPORTANT : tout élément initialement porté par le div d'entrée sera supprimé.
 * 
 * 
 * Fonctionalités du composant :
 * - Gestion du scroll horizontal par clique sur bouton droit / bouton gauche.
 * - La flèche de scroll gauche n'est affichée que si un scroll gauche est possible (plus de carte qu'il n'est possible 
 *   d'afficher et position du scroll pas tout à fait à gauche).
 * - Même comportement pour la flèche de droite (comportement inversé).
 * - Gestion d'un seul mode de scroll: le scroll continu. Le scroll pas à pas n'est pas géré.
 * - Prise en compte du changement d'orientation des cartes pour déterminer l'affichage ou non des flèches de scroll.
 * - Prise en compte de l'ajout / suppression de carte pour déterminer l'affichage ou non des flèches de scroll.
 * 
 * 
 * Fonctionalités absentes du composant :
 * - Le scroll pas à pas n'est pas géré.
 * - Pas de gestion du scroll vertical.
 * - Pas de mémorisation de la position du scroll si le contenu est vidé puis qu'un nouveau contenu est inséré.
 * 
 */

// Fréquence (vitesse) de déplacement du scroll en ms.
const SCROLL_FREQUENCY = 40;

// Pas de déplacement du scroll en px.
const SCROLL_STEP = 100;


// Id de la tâche de timeout du scroll.
// Lors d'un mouse down sur un bouton de scroll, un timeout est lancé pour provoqué un scroll d'un pas p toutes les m millisecondes.
// Lors du mouseup le timeout est arrêté.
// Cet id permet de déterminer quel timeout doit être arrêté lors du mouseup.
var scrollingTaskId;


/**
 * Point d'entrée de la fonctionnalité.
 * "tranforme" un simple div en un composant scrollable par bouton.
 * Un composant est ici un ensemble de div et d'img empilés.
 * Retourne le div de ce composant qui sera utilisé par la suite pour ajouter les cartes.
 * 
 * Optimisation : cette fonction peut être appelée plusieurs fois pour le même div. pour éviter de 
 * reconstruire le composant à chaque fois, et potentiellement perdre les cartes qui y sont affichées,
 * un attribut isBoardArea est ajouté au div sur lequel le composant sera posé.
 * Si le div en entrée de la fonction porte cet attribut, le composant ne sera pas reconstruit.
 * 
 * @param divId : id du div où poser le composant scrollable.
 * @param theme : thème à appliquer au composant (couleur, etc...)
 * @returns le div où devront être ajoutées les cartes sur le composant scrollable.
 */
function setAsBoardArea(divId,theme) {

	// div où poser le composant scrollable
	var divBack = document.getElementById(divId);
	
	// div où devront être ajoutées les cartes.
	var divCardsContainer = null;
	
	if (divBack != null) {
		
		if (divBack.isBoardArea == null) {
			// si le div existe et qu'il n'a pas encore de composant scrollable.
			
			// construction du composant et ajout sur le div.
			consolelog(divId + " transform to boardArea")
			
			// récupération du div où ajouter les cartes
			divCardsContainer = transformArea(divBack,theme);
		
		} else {
			// si le div existe et qu'il a déjà un composant scrollable.
			
			// récupération du div où ajouter les cartes
			divCardsContainer = divBack.scrollElements.divCardsContainer;
		}
	
	}

	// retour du div où ajouter les cartes
	return divCardsContainer;
}

/**
 * "Tranforme" un div simple en un composant scrollable par bouton.
 * 
 * - Supprime tout les éléments éventuellement déjà présent sur le div d'entrée.
 * - Ajoute au div d'entrée les div et img nécessaires au fonctionnement du composant.
 * - Ajoute au div d'entrée un attribut isBoardArea pour le tagué "div portant un composant scrollable".
 * - Ajoute au div d'entrée un attribut scrollElements qui est une structure de donnée référençant certains 
 *   éléments (div, img) qui constitueront le composant.
 * 
 * @param divId : id du div où poser le composant scrollable.
 * @param theme : thème à appliquer au composant (couleur, etc...)
 * @returns le div où devront être ajoutées les cartes sur le composant scrollable.
 */
function transformArea(divBack,theme) {
	
	// préfixe d'id utilisé pour fournir un id unique aux éléments utilisés pour constituer le composant scrollable.
	var id = divBack.id + "_";
	
	// structure de donnée référençant certains éléments (div, img) qui constitueront le composant.
	var elements = {};
	
	// application des nouveaux attributssur le div d'entrée
	divBack.isBoardArea = true;
	divBack.scrollElements = elements;
	
	// suppression du contenu du div d'entrée, et transformation en grille pour préparer 
	// l'ajout des nouveaux éléments.
	divBack.innerHTML = "";
	divBack.classList.add("boardArea_back");

	// création d'un div qui contiendra l'img de la flèche de gauche
	// posé sur le div d'entrée 
	var divLeftArrowBack = document.createElement("div");
	divLeftArrowBack.classList.add("leftArrowBack");
	divBack.appendChild(divLeftArrowBack);

	// img de la flèche de gauche
	// le thème est pris en compote pour sélectionner l'image à appliquer
	// l'img est masqué par défaut
	// les évènements mousedown et mouseup sont écoutés pour gérer le scroll
	var imgLeftArrow = document.createElement("img");
	imgLeftArrow.src = "img/" + encodeURI(theme+"_arrow_left.png");
	imgLeftArrow.classList.add("imgLeftArrow");
	imgLeftArrow.style.display = "none";
	imgLeftArrow.addEventListener("mousedown", scrollToLeft);
	imgLeftArrow.addEventListener("mouseup", stopScrolling);
	imgLeftArrow.scrollElements = elements;
	divLeftArrowBack.appendChild(imgLeftArrow);

	// création d'un div intermédiaire
	// posé sur le div d'entrée et placé entre les deux div des flèches
	var divBackCards = document.createElement("div");
	divBackCards.classList.add("boardArea_backCards");
	divBack.appendChild(divBackCards);
	
	// création d'un div de scroll
	// c'est ce div qui portera l'attribut overflow-x: auto;
	// posé sur le div intermédiaire
	var divScrollCards = document.createElement("div");
	divScrollCards.classList.add("boardArea_scrollCards");
	divBackCards.appendChild(divScrollCards);

	// création d'un div qui sera le div où seront ajoutées les cartes
	// posé sur le div de scroll
	var divCardsContainer = document.createElement("div");
	divCardsContainer.id = id + "divCardsContainer";
	divCardsContainer.classList.add("boardArea_cardsContainer");
	divCardsContainer.scrollElements = elements;
	divCardsContainer.isBoardArea = true;
	divScrollCards.appendChild(divCardsContainer);
	
	// création d'un div qui contiendra l'img de la flèche de gauche
	// posé sur le div d'entrée 
	var divRightArrowBack = document.createElement("div");
	divRightArrowBack.classList.add("rightArrowBack");
	divBack.appendChild(divRightArrowBack);
	
	// img de la flèche de droite
	// le thème est pris en compote pour sélectionner l'image à appliquer
	// l'img est masqué par défaut
	// les évènements mousedown et mouseup sont écoutés pour gérer le scroll
	var imgRightArrow = document.createElement("img");
	imgRightArrow.src = "img/" + encodeURI(theme+"_arrow_right.png");
	imgRightArrow.classList.add("imgRightArrow");
	imgRightArrow.style.display = "none";
	imgRightArrow.addEventListener("mousedown", scrollToRight);
	imgRightArrow.addEventListener("mouseup", stopScrolling);
	imgRightArrow.scrollElements = elements;
	divRightArrowBack.appendChild(imgRightArrow);
	
	// initialisation d'une structure de donnée portant les références à certains
	// des élément constituant le composaant (div, img)
	// cette structure sera portée par les img des flèche, le div où poser les cartes, et le div d'entrée
	// cette structure permettra par exemple lors du mousedown sur une flèche de savoir rapidement à quelle
	// zone l'img appartien.
	elements.imgLeftArrow = imgLeftArrow;
	elements.divScrollCards = divScrollCards;
	elements.divCardsContainer = divCardsContainer;
	elements.imgRightArrow = imgRightArrow;

	// enregistrement de la fonction de mise à jour permettant au besoin de provoquer une mise à jour des flèches
	// depouis l'exterieur du composant
	divCardsContainer.updateScrollArrows = updateScrollArrows;

	// ajout de la gestion des évènements d'insertion et de suppression de node au div où devront être
	// ajoutées les cartes. Permets la mise à jour du composant à chaque ajout / suppression de carte.
	// une référence à la fonction de traitement des évènement est conserver pour pouvoir supprimer le listener.
	divCardsContainer.updateArrowsEventTarget = (function(event) { tryUpdateScrollArrows(event, divCardsContainer); });
	divCardsContainer.addEventListener("DOMNodeInserted",  divCardsContainer.updateArrowsEventTarget);
	divCardsContainer.addEventListener("DOMNodeRemoved", divCardsContainer.updateArrowsEventTarget );
	
	// retourne le div où poser les cartes
	return divCardsContainer
}

/**
 * Fonction permettant de vider le contenu du div où devront être ajoutées les cartes.
 * Bref, permet de supprimer toutes les cartes d'un div.
 * 
 * Trois cas de figure :
 * - Le div en entrée est un div simple, non "transformé" en composant scrollable : 
 * 		=> un simple innerHTML = "" sera ppliqué.
 * - Le div en entrée est le div sur lequel a été posé le composant scollable :
 * 		=> le div où sont posées les cartes sera recherché et une boucle de suprresion des child de celui-ci sera  
 * 		   appliquée pour en supprimer le contenu. Ceci permet une meilleure réactivité de la mise à jour de l'état
 * 		    du DOM et une meilleure cohérence de cet état.
 * - Le div en entrée est le div où poser les cartes du composant scrollable :
 * 		=> une boucle de suprresion des child de celui-ci sera appliqué pour supprimer le contenu. Ceci permet une
 * 		   meilleure réactivité de la mise à jour de l'état du DOM et une meillere cohérence de cet état.  
 * 
 * @param divBack div où sont ajoutées les cartes : peut-être un div simple, ou le div conteneur de carte d'un composant scrollable. 
 * @returns : le div où doivent être posées les cartes. null si le div en entrée est null.
 */
function cleanArea(divBack) {

	var cardsArea = null;
	
	if (divBack != null) {
		
		if (divBack.isBoardArea == null) {
			// Cas d'un div simple
			divBack.innerHTML = "";
			cardsArea = divBack;
			
		} else {
			// cas d'un div portant un composant scrollable ou du div conteneur de cartes d'un composant scrollable
			// dans ces deux cas le div porte une structure de données référençant certains éléments du composant. 
			
			// récupération du div où poser les cartes
			var divCardsContainer = divBack.scrollElements.divCardsContainer;
			
			// récupération de la fonction de traitement des évènements d'insertion et suppression de noeuds du DOM
			var updateArrowsEventTarget = divCardsContainer.updateArrowsEventTarget;
			
			// suppression des listeners des évènements d'insertion et suppression de noeuds du DOM pour éviter les effets
			// de bord lors de la suppressions des élément du div.
			divCardsContainer.removeEventListener("DOMNodeInserted", updateArrowsEventTarget );
			divCardsContainer.removeEventListener("DOMNodeRemoved", updateArrowsEventTarget );
			
			// suppression des elements du div (les cartes)
			while (divCardsContainer.firstChild) {
				divCardsContainer.lastChild.domCard.remove();
			}
		
			// masquages des flèches de scroll (plus de cartes sur le div, plus besoin de flèches)
			divBack.scrollElements.imgLeftArrow.style.display = "none";
			divBack.scrollElements.imgRightArrow.style.display = "none";
			
			// mise à zéro du compteur de cartes sur le div
			divCardsContainer.cardsLength = 0;	
			
			// réactivation des listeners des évènements d'insertion et suppression de noeuds du DOM
			divCardsContainer.addEventListener("DOMNodeInserted", updateArrowsEventTarget );
			divCardsContainer.addEventListener("DOMNodeRemoved", updateArrowsEventTarget );
		
			cardsArea = divCardsContainer;
		}
		
	}
	
	// retourne le div où poser les cartes
	return cardsArea;
}


/**
 * Fonction permettant le lancement du scroll vers la gauche.
 * Est appelée lors d'un mousedown sur l'img fléche gauche.
 * 
 * @param event évènement mousedown à l'origine de l'appel
 */
function scrollToLeft(event) {
	startScroll(event, -SCROLL_FREQUENCY);
}

/**
 * Fonction permettant le lancement du scroll vers la droite.
 * Est appelée lors d'un mousedown sur l'img fléche froite.
 * 
 * @param event évènement mousedown à l'origine de l'appel
 */
function scrollToRight(event) {
	startScroll(event, SCROLL_FREQUENCY);
}

/**
 * Fonction permettant le lancement du scroll vers la gauche ou vers la droite selon la valeur du pas.
 * - un pas négatif : scroll vers la gauche.
 * - un pas position : scroll vers la droite.
 * 
 * @param event évènement mousedown à l'origine de l'appel
 * @param scrollStep pas de déplacement du scroll
 */
function startScroll(event, scrollStep) {
	
	// force l'arrêt d'un éventuel scrolling du composant 
	// au cas où mousedown soit intercepté plus qu'un précéent mouseup 
	stopScrolling();

	// récupération d'une structure de données référençant certains éléments du composant scrollable
	// pour trouver le div scrollable correspondant à l'img sur lequel l'utilisateur a effectué un mousedown.
	var elements = event.target.scrollElements;
	var div = elements.divScrollCards;
	
	// ajout sur la structure de la distance de scroll maximale actuelle
	elements.scrollMax = div.scrollWidth - div.clientWidth;
	
	// lancement du scroll en commançant par un premier pas pour assurer un déplacement
	// même si l'enchaînement mousedown/mouseup est très rapide (inférieure à la fréquence de scroll).
	doScroll(scrollStep, elements);
	// puis en lançant une boucle de scroll que sera arrêtée lors d'un mouseup sur l'img.
	scrollingTaskId = setInterval(function(){ doScroll(scrollStep, elements); }, SCROLL_FREQUENCY);
}

/**
 * Fonction permettant l'arrêt du scrolling en cours.
 * Est appelée lors d'un mouseup sur un img flèche droite ou gauche, ou lorsque
 * le scroll à atteind sa position max.
 * 
 * @returns
 */
function stopScrolling() {
	
	if (scrollingTaskId != null) {
		// Si un scroll est en cours l'id de timeout permettant la boucle de scroll a été enregistré
		
		// arrêt du timeout, arrêtant du même coup le scroll
		clearInterval(scrollingTaskId);
		
		// suprression de l'id du timeout indiquant qu'ancun scroll est en cours.
		scrollingTaskId == null;
	}

}

/**
 * Fonction effectuant un pas de déplacement de scroll.
 * 
 * @param offset taille du pas a effectuer. Peut e^tre négatif (scroll gauche) ou positif (scroll droit).
 * @param elements structure de onnées référençant certains élément du composant scrollable et la distance maximale de scroll possible. 
 */
function doScroll(offset, elements) {

	// div de scroll (div situé sous le div où poser les cartes).
	var div = elements.divScrollCards;
	
	// distance maximale de scroll possible.
	var max = elements.scrollMax;

	// position actuelle du scroll.
	var x = div.scrollLeft;
	
	if (offset > 0) {
		// si le pas est positif => scroll vers la droite.
		// si la distance séparant la position actuelle et la position la plus à droite possible (max) est
		// inférieue au pas de scroll, la nouvelle position sera la position max de droite (max).
		// sinon la nouvelle position sera la position actuelle + 1 pas.
		x = (x > (max - offset)) ? max : x + offset;
		div.scrollLeft = x;

	} else {
		// si le pas est négatif => scroll vers la gauche.
		// si la distance séparant la position actuelle et la position la plus à gauche possible (0) est
		// inférieue au pas de scroll, la nouvelle position sera la position max de gauche (0).
		// sinon la nouvelle position sera la position actuelle - 1 pas.
		x = (x < (-offset)) ? 0 : x + offset;
		div.scrollLeft = x;
	}

	if (x == 0) {
		// si la nouvelle position est 0 (max à gauche) alors arrêt forcé du scrolling et masquage de la flèche gauche.
		stopScrolling();
		elements.imgLeftArrow.style.display = "none";
	} else {
		// sinon affichage de la flèche droite.
		elements.imgLeftArrow.style.display = "block";
	}
	
	if (x == max) {
		// si la nouvelle position est max (max à droite) alors arrêt forcé du scrolling et masquage de la flèche droite.
		stopScrolling();
		elements.imgRightArrow.style.display = "none";
	} else {
		// sinon affichage de la flèche droite.
		elements.imgRightArrow.style.display = "block";
	}
	
}

/**
 * Fonction permettant, suite à l'ajout ou la suppression d'un élément sur le DOM, de déterminer
 * si l'élément est bien une carte, et dans ce cas de la retourner.
 * 
 * IMPORTANT : les évènements DOMNodeInserted et DOMNodeRemoved d'un élément sont levés si un node
 * a été inséré ou supprimé sur cet élément, ou sur un des fils de l'élément. Il est donc nécessaire
 *  de vérifier que le composant ajouté est une carte (parent = div où poser les cartes).
 * 
 * @param event évènement à l'origine de l'appel à cette fonction
 * @param divCardsContainer le div sur lequel a été levé l'évènement (div où sont posées les cartes sur le composant scrollable).
 * @returns domCard de la carte ajoutée ou supprimée si il s'agit bien d'une carte, null sinon.
 */
function getCardAdded(event, divCardsContainer) {
	
	var result = null;
	
	if ((event != null) && (divCardsContainer != null)) {
		
		// element du DOM qui a été ajouté
		var addedElement = event.target;
		
		if (addedElement != null) {
			var parentOfAddedElement = addedElement.parentNode;
			
			if ((parentOfAddedElement != null) && (parentOfAddedElement == divCardsContainer)) {
				result = addedElement.domCard; 
			}
		}
	}

	return result;
}

/**
 * Tente la mise à jour de l'affichage (visible/invisible) des flèches de scroll d'un composant scrollable.
 * 
 * IMPORTANT : la fonction "tente" la mise à jour car lors des appel à cette fonction le DOM n'est pas forcément prêt.
 * Cette fonction testera plusieurs fois l'état du DOM avant de pouvoir aboutir à la mise à jour de l'état des flèches.  
 * 
 * @param event évènement à l'origne de l'appel de cette fonction.
 * @param divCardsContainer div où poser les cartes du composant scrollable.
 * 
 */
function tryUpdateScrollArrows(event, divCardsContainer) {

	// récupération de l'élément (carte) ajoutée au div
	var domCard = getCardAdded(event, divCardsContainer);
	
	if (domCard != null) {
		// si l'élément ajouté n'était pas une carte, fin du traitement
		// sinon...
		
		consolelog(divCardsContainer.id + " " + event.type);
		
		// enregistrement sur le domCard de la zoneù il est posé.
		// Cette info sera utilisée lors des drag-and-drop pour déterminer d'où on viens.
		domCard.divCardsContainer = divCardsContainer;
		
		// ajout des listener des events used et activated de la nouvelle carte
		domCard.addEventListener("used", function() { testIfDivReadyToUpdateArrows(divCardsContainer, 0); })
		domCard.addEventListener("activated", function() { testIfDivReadyToUpdateArrows(divCardsContainer, 0); })
		
		/**
		 * IMPORTANT, RUSTINE, CODE DE M...
		 * lorsque l'évènement DOMNodeRemoved est levé, le DOM n'est pas "prêt" et le nombre
		 * de node fils du composant aillant levé l'évènement est inchangé (si il y avait 10 fils 
		 * avant la levée de l'évent DOMNodeRemoved, il y arura ici encore 10 fils selon le DOM).
		 * Pour paré à ce pb, un offset de 1 fils à ignorer (ou offset de nombre de carte) est utilisé.
		 */
		var offsetCardLength = (event.type == "DOMNodeRemoved" ? 1 : 0);
		
		// appel de la fonction de test de l'état du DOM qui elle-même appelera la fonction
		// de mise à jour des flèches quand le DOM sera prêt.
		testIfDivReadyToUpdateArrows(divCardsContainer, offsetCardLength);
	}
}

/**
 * Cette fonction teste tant que nécessaire l'état du DOM, une fois le DOM prêt (suffisament chargé), cette fonction
 * appelera la fonction de mise à jour des flèches de scroll.
 * 
 * IMPORTANT : comment est déterminé le fait que le DOM soit suffisament chargé ?
 * Un parcours des cartes posés sur le div de cartes est effectué. Si au moins une des cartes a un width =0 alors le DOM
 * n'est pas suffisament chargé. Un timeout est alors lancé pour retenter le test un peu plus tard.
 * 
 * @param divCardsContainer div où poser les cartes diu composant scrollable.
 * @param offsetCardLength offset de décompte du nombre de cartes posé sur le div divCardsContainer (voir fonction tryUpdateScrollArrows appelante).
 */
function testIfDivReadyToUpdateArrows(divCardsContainer, offsetCardLength) {
	
	if (divCardsContainer != null) {
	
		var id = divCardsContainer.id;
		
		// ensemble des éléments (au sens DOMNode) enfants du div où poser les cartes.
		// cet ensemble (ce tableau child) fourni par le DOM n'est pas forcement à jour à ce moment du traitement.
		// il peut contenir une carte de trop.
		var childs = divCardsContainer.childNodes;
		consolelog(id + " childNodes.length = " + childs.length);

		/**
		 * Alors attention à la prise de tête... calcul du nombre de cartes à prendre en compte dans
		 * la détermination de la largeur en pixel de l'ensemble des cartes.
		 * 
		 * offsetCardLength, qui a été passé en paramètre, nous indique si l'évènement à l'origine de cetraitement
		 * est du type DOMNodeInsered ou DOMNodeRemoved. Si offsetCardLength est à 1 il s'agit de DOMNodeRemoved.
		 * Il faut alors envisager qu'une des cartes de childs est en trop car le DOM n'a pas encore pris en compte
		 * la suppression de la carte.
		 * 
		 * Pour palier à ce pb un attribut cardLength a été posé sur le div où poser les cartes. Il s'agit d'un compteur
		 * indiquant en permanence le nombre de carte réélement présent sur de div.
		 * 
		 * Dans le cas d'une suppression de carte (offsetCardLength = 1), et à ce moment du traitement, le nombre de 
		 * cartes de childs devrait être de 1 de moins que cet attribut. 
		 * - Si c'est le cas, alors c'est que le DOM est à jour, offsetCardLength passe à 0 pour ne plus impacter les calculs suivants. 
		 * - Si ce n'est pas le cas, offsetCardLength reste à 1 pour qu'une carte de moins soient prise en compte dans les calculs suivants.
		 *  
		 */
		if (! ((offsetCardLength == 1) 
				&& (divCardsContainer.cardsLength != null) 
				&& (divCardsContainer.cardsLength == childs.length))) {
			offsetCardLength = 0;
		}
		
		consolelog(id + " nombre de cartes pris en compte : " + (childs.length - offsetCardLength));
		
		var s = "";
		var w;
		var zeroWidthFound = false;
		
		// parcours des cartes (à l'offsetCardLength près) pour vérifier que toute les carte retournes un width > 0.
		// si un zéro est trouvé, c'est que le DOM n'est pas suffisament chargé.
		for (var i = 0; i < (childs.length - offsetCardLength); i++) {
			w = childs[i].offsetWidth;
			zeroWidthFound = (w == 0);
			s += w + ",";
		}		

		consolelog(id + " " + s);

		if (zeroWidthFound) {
			// si un zéro a été trouvé, c'est que le DOM n'est pas suffisament chargé.
			// => lancement d'un timeout pour retester l'état du DOM plus tard.
			
			consolelog(id + " => au moins un 0 trouvé, on retente");
			
			setTimeout( function(){ 
				testIfDivReadyToUpdateArrows(divCardsContainer, offsetCardLength) 
				}, 100);

		} else {
			// si aucun zéro n'a été trouvé, c'est que le DOM est suffisament chargé.
			// => lancement de l'étape finale de mise à jour des flèches de scroll.

			consolelog(id + " => Les width sont ok");
			consolelog(id + " => fin du timeout");
			consolelog(id + " => Lancement du calcule");
			
			updateScrollArrows(divCardsContainer, offsetCardLength);
		}
		
	}
	
}

/**
 * Fonction de mise à jour de l'état des flèches de scroll.
 * 
 * @param divCardsContainer div où poser les cartes diu composant scrollable.
 * @param offsetCardLength offset de décompte du nombre de cartes posé sur le div divCardsContainer (voir fonction testIfDivReadyToUpdateArrows appelante).
 * @returns
 */
function updateScrollArrows(divCardsContainer, offsetCardLength) {

	consolelog(divCardsContainer.id + " Update arrows");

	// structure de données référençant certains éléments du composant scrollable (img, div)
	var elements = divCardsContainer.scrollElements;
	
	if (elements != null) {
			
		var id = divCardsContainer.id;
		var childs = divCardsContainer.childNodes;
		
		var scrollMax = elements.divScrollCards.scrollWidth - elements.divScrollCards.clientWidth;
		
		// récupération de la position (left) et de la largeur (width) de la dernière carte A PRENDRE EN COMPTE
		// posée sur le div. "offsetCardLength" est là pour indiquer quelle "dernière" carte doit être prise en compte. 
		var i = (childs.length - offsetCardLength) - 1;
		var cardWidth = 0;
		var cardLeft = 0;
		if (i >= 0) {
			cardWidth = childs[i].offsetWidth;
			cardLeft = (childs[i].offsetLeft != null) ? childs[i].offsetLeft : 0;
		}
		
		// left + width de la dernière carte à prendre en compte 
		// => position la plus à droite à prendre en compte pour calculer la largeur d'affichage formée par toutes les cartes.
		var sumWidthAndLeft = (cardWidth + cardLeft);
		
		// mémorisation du nombre de cartes réel sur la zone
		// sera utilisée pour déterminé si a un instant t le DOM est à jour ou pas.
		divCardsContainer.cardsLength = childs.length - offsetCardLength;

		// plein de logs !
		consolelog(id + " childNodes.length = " + childs.length + (offsetCardLength == 1 ? " (-1)" : ""));				
		consolelog(id + " width + left of last card : " + cardWidth + " + " + cardLeft + " = " + sumWidthAndLeft);
		consolelog(id + " test : " + sumWidthAndLeft + " >=? " + divCardsContainer.clientWidth);
		
				
		if (sumWidthAndLeft > divCardsContainer.clientWidth) {
			// si la largeur de la zone couverve par les cartes est supérieure à la zone d'affichage
			// alors il faut envisager d'afficher les flèches de scroll.
			
			consolelog(id + " tenter d'afficher flèches");
			consolelog(id + " scrollLeft = " + elements.divScrollCards.scrollLeft);
			consolelog(id + " scrollMax = " + scrollMax);
			
			// affichage des flèche en fonction de la position courante du scroll
			if (elements.divScrollCards.scrollLeft > 0) {
				elements.imgLeftArrow.style.display = "block";
				consolelog(divCardsContainer.id + " flèche gauche : affichée");
			} else {
				elements.imgLeftArrow.style.display = "none";
				consolelog(divCardsContainer.id + " flèche gauche : masquée");
			}
			
			if (elements.divScrollCards.scrollLeft < scrollMax) {
				elements.imgRightArrow.style.display = "block";
				consolelog(divCardsContainer.id + " flèche droite : affichée");
			} else {
				elements.imgRightArrow.style.display = "none";
				consolelog(divCardsContainer.id + " flèche droite : masquée");
			}
			
		} else {
			// si la largeur de la zone couverve par les cartes est inférieure à la zone d'affichage
			// alors il faut masquer les flèches de scroll.
			
			elements.imgLeftArrow.style.display = "none";
			elements.imgRightArrow.style.display = "none";
			consolelog(id + " masquer flèches");
		}
	}	
}

/**
 * Surcharge de la fonction de log de la console, permettant d'activer ou non les log du composant scrollable rapidement.
 * @param message
 * @returns
 */
function consolelog(message) {
	//console.log(message);
}