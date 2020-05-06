class DomCard {

	constructor(card, height, cardDrawMode) {

		this.card = card;

		this.divCard = document.createElement("div");
		
		if (cardDrawMode == CARD_DRAW_MODES_DICE) {
			this.divCard.classList.add("cardDice");
		} else {
			this.divCard.classList.add("cardBoard");
		}
    	this.divCard.style.cssFloat = "left";
		
        this.divBackImg = document.createElement("div");

        this.cardImg = document.createElement("img");
        //this.cardImg.loading = "lazy";
        this.cardImg.src = "img/" + encodeURI(card.path);
        this.cardImg.height = height;
        this.cardImg.title = card.id;
        this.cardImg.onclick = (function() { showCardPopin(this.cardImg.src); }).bind(this);
        this.cardImg.oncontextmenu = function() { return false; };

        // application de transformations
        this.setIsActivated(card.activated);
        this.setIsUsed(card.used);
       

        this.divBackImg.appendChild(this.cardImg);
        this.divBackImg.style.position = "relative";
        
        this.divCard.appendChild(this.divBackImg);
        this.divCard.domCard = this;

  	}

	getIsActivated() {
		return this.card.activated;
	}

	setIsActivated(isActivated) {

		this.card.activated = isActivated;
		
		if (isActivated) {
			this.cardImg.classList.add("activatedCard");
		} else {
			this.cardImg.classList.remove("activatedCard");
		}
		
		this.divCard.dispatchEvent(new CustomEvent("activated", this));
	}

	getIsUsed() {
		return this.card.used;
	}

	setIsUsed(isUsed) {

		this.card.used = isUsed;
		
		if (isUsed) {
			this.cardImg.classList.add("usedCard");
		} else {
			this.cardImg.classList.remove("usedCard");
		}
		
		this.divCard.dispatchEvent(new CustomEvent("used", this));
	}

	remove() {
		this.divCard.remove();
	}
	
	addMenu(menu) {
		this.menu = menu;
		
		// affichage du menu contextuel lors de l'entrée de la souris sur l'image
		//cardImg.addEventListener('mouseenter', (function() { showCardMenu(this); }).bind(divMenu) );

		// affichage du menu contextuel lors d'un clique-droit sur l'image
		this.cardImg.oncontextmenu = (function() { return this.showCardMenu(); }).bind(this);
		
		// masquage du menu contextuel lors de la sortie de la souris de l'image
		this.divCard.mouseLeaveEventTarget = (function() { this.hideCardMenu(); }).bind(this);
		this.divCard.addEventListener('mouseleave',  this.divCard.mouseLeaveEventTarget);
		showCardMenu();
	}
	 
	showCardMenu() {

		if (this.menu != null) {
			this.divMenu = null;
			
			var menuTop = "0px";
			var menuLeft = "0px";
			
			// menu
			this.divMenu = document.createElement("div");
			this.divMenu.id = "divMenu_" + this.card.id;
			this.divMenu.classList.add('menuCardDiv');
			this.divMenu.style.top = menuTop;
			this.divMenu.style.left = menuLeft;
		    this.divBackImg.appendChild(this.divMenu);
		    		
		    this.menu.forEach ((function(item) {
				this.divMenu.appendChild(this.buildMenuItem(this.divMenu, this.card, item));
			}).bind(this));

		    this.divMenu.style.display = 'block';
			this.divMenu.style.zIndex = 10;
		}
		
		return false;
	}
	
	hideCardMenu() {
		//this.divMenu.style.display = 'none';
		
		if (this.divMenu != null) {
			this.divBackImg.removeChild(this.divMenu);
			this.divMenu = null;
		}
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
		menuItemAction(this);
	
	}
	
	addEventListener(event, fct) {
		this.divCard.addEventListener(event, fct);
	}
}
