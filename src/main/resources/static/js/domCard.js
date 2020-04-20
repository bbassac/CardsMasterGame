const CARD_DRAW_MODES_DICE = 1;
const CARD_DRAW_MODES_BOARD = 2;

class DomCard {

	constructor(card, height, cardDrawMode) {
	
		this.card = card;
	
		this.divCard = document.createElement("div");
		
		if (cardDrawMode == CARD_DRAW_MODES_DICE) {
			this.divCard.style.margin = "auto";
		} else {
			this.divCard.style.marginTop = "auto";
			this.divCard.style.marginBottom = "auto";
			this.divCard.style.marginLeft = "5px";
		}
		
        this.divBackImg = document.createElement("div");

        this.cardImg = document.createElement("img");            
        this.cardImg.src = "img/" + encodeURI(card.path);
        this.cardImg.height = height;
        this.cardImg.title = card.id;
        this.cardImg.onclick = (function() { showCardPopin(this.cardImg.src); }).bind(this);
        this.cardImg.oncontextmenu = function() { return false; };
        
        // application de transformations
        if (card.activated) { this.cardImg.classList.add("activatedCard"); }
        if (card.used){ this.cardImg.classList.add("usedCard"); }
        

        this.divBackImg.appendChild(this.cardImg);
        this.divBackImg.style.position = "relative";
        
        this.divCard.appendChild(this.divBackImg);
	
  	}

	addMenu(menu) {

		var menuTop = "0px";
		var menuLeft = "0px";
		
		// menu
		this.divMenu = document.createElement("div");
	    this.divBackImg.appendChild(this.divMenu);
		this.divMenu.id = "divMenu" + this.card.id;
		this.divMenu.classList.add('menuCardDiv')
		this.divMenu.style.top = menuTop;
		this.divMenu.style.left = menuLeft;
	    		
		menu.forEach ((function(item) {
			this.divMenu.appendChild(this.buildMenuItem(this.divMenu, this.card, item));
		}).bind(this));
	
		// affichage du menu contextuel lors de l'entrée de la souris sur l'image
		//cardImg.addEventListener('mouseenter', (function() { showCardMenu(this); }).bind(divMenu) );

		// affichage du menu contextuel lors d'un clique-droit sur l'image
		this.cardImg.oncontextmenu = (function() { return this.showCardMenu(); }).bind(this);
		
		// masquage du menu contextuel lors de la sortie de la souris de l'image
		this.divCard.addEventListener('mouseleave', (function() { this.hideCardMenu(); }).bind(this) );
	
	 }
	 
	showCardMenu() {
		this.divMenu.style.display = 'block';
		return false;
	}
	
	hideCardMenu() {
		this.divMenu.style.display = 'none';
	}
	
	buildMenuItem(menu, card, menuItemInfos) {
	
	    var menuItem = document.createElement("div");
	    menuItem.classList.add('menuCardItem');
	    menuItem.card = card;
	    menuItem.menu = menu;
	
	    
	    if (menuItemInfos.text) {
	    	menuItem.innerHTML = menuItemInfos.text;
	    }
	    
	    if (menuItemInfos.action) {
	    	menuItem.addEventListener("click", this.clickOnItem.bind(menuItem, menuItemInfos.action) );
	    }
	    
		return menuItem;
	}
	
	clickOnItem(menuItemAction) {
	
		// cache le menu contextuel
		this.menu.style.display = "none";
		
		// joue l'action associé au menu item qui a été cliqué
		menuItemAction();	
	
	}
}