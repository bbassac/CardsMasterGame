const ALLOW_PROPERTY_MNU = false;

class DomCard {

	constructor(card, height, cardDrawMode) {

		// mapping de card vers DomCard
		this.id = card.id;
		this.damage = card.dammagePoints;
		this.used = card.status.used;
		this.activated = card.status.activated;
		this.metaData = card.metaData;

		this.buildDomElemnts(height, card.path);
		this.applyStyle(cardDrawMode);
		
        // par défaut la carte ne doit pas être draggable 
        this.setDraggable(false);

  	}

	buildDomElemnts(height, imgPath) {
		
		this.divCard = document.createElement("div");
		
        this.cardImg = document.createElement("img");
        this.cardImg.src = "img/" + encodeURI(imgPath);
        this.cardImg.height = height;
        this.cardImg.title = this.id;
        this.cardImg.onclick = (function() { showCardPopin(this.cardImg.src); }).bind(this);
        this.cardImg.oncontextmenu = function() { return false; };

        this.divBackImg = document.createElement("div");
        this.divBackImg.appendChild(this.cardImg);
        this.divBackImg.style.position = "relative";
        
        this.divCard.appendChild(this.divBackImg);
        this.divCard.domCard = this;

        if (ALLOW_PROPERTY_MNU) {
        	// force l'ajout d'un menu de test
        	this.addMenu([]);
        }
	}
	
	applyStyle(cardDrawMode) {
		
		if (cardDrawMode == CARD_DRAW_MODES_STACK) {
			this.divCard.classList.add("cardDice");
		} else {
			this.divCard.classList.add("cardBoard");
		}
    	this.divCard.style.cssFloat = "left";

	}
	
	getId() {
		return this.id;
	}
	
	updateCard(card) {

		this.id = card.id;
		this.setDamage(card.dammagePoints);
		this.setUsed(card.status.used);
		this.setActivated(card.status.activated);
		this.setMetaData(card.metaData);
	}

	getZone() {
		return this.zone;
	}
	
	setZone(zone) {
		this.zone = zone;
	}
	
	getDraggable() {
		return this.cardImg.draggable;
	}

	setDraggable(draggable) {

		this.cardImg.draggable = draggable;
		
		if (draggable) {
			this.cardImg.addEventListener("dragstart", (function(event) { this.getZone().startDragDomCard(event, this); }).bind(this))
		}
	}
	
	getActivated() {
		return this.activated;
	}
	
	setActivated(activated) {
		if (this.activated != activated) {
			this.activated = activated;
			this.divCard.dispatchEvent(new CustomEvent("activatedChanged", this));
			this.divCard.dispatchEvent(new CustomEvent("sizeChanged", this));
		}
	}

	getUsed() {
		return this.used;
	}

	setUsed(used) {
		if (this.used != used) {
			this.used = used;
			this.divCard.dispatchEvent(new CustomEvent("usedChanged", this));
		}
	}

	
	getDamage() {
		return this.damage;
	}

	setDamage(damage) {
		if (this.damage != damage) {
			this.damage = damage;
			this.divCard.dispatchEvent(new CustomEvent("damageChanged", this));
		}
	}

	getMetaData() {
		return this.metaData;
	}

	setMetaData(metaData) {
		if (this.metaData != metaData) {
			this.metaData = metaData;
			this.divCard.dispatchEvent(new CustomEvent("metaDataChanged", this));
		}
	}	
	
	addMenu(menu) {
		this.menu = menu;
		
		// ajout d'un item de test mode test
		if (ALLOW_PROPERTY_MNU) {
			this.menu.push({ text: "Log propriétés", action: (function() { this.showCardProperties(); }).bind(this) });
		}
		
		// affichage du menu contextuel lors d'un clique-droit sur l'image
		this.cardImg.oncontextmenu = (function() { return this.showCardMenu(); }).bind(this);
		
		// suppression du menu contextuel lors de la sortie de la souris de l'image
		this.divCard.mouseLeaveEventTarget = (function() { this.deleteCardMenu(); }).bind(this);
		this.divCard.addEventListener('mouseleave',  this.divCard.mouseLeaveEventTarget);
	}
	 
	showCardMenu() {

		if ((this.menu != null) && (this.menu.length)) {
			this.divMenu = null;
			
			var menuTop = "0px";
			var menuLeft = "0px";
			
			// menu
			this.divMenu = document.createElement("div");
			this.divMenu.id = "divMenu_" + this.id;
			this.divMenu.classList.add('menuCardDiv');
			this.divMenu.style.top = menuTop;
			this.divMenu.style.left = menuLeft;
		    this.divBackImg.appendChild(this.divMenu);
		    
		    var menuItemIdex = 0;
		    this.menu.forEach ((function(menuItemInfos) {
		    	menuItemInfos.index = menuItemIdex++;
				this.divMenu.appendChild(this.buildMenuItem(this.divMenu, menuItemInfos));
			}).bind(this));

		    this.divMenu.style.display = 'block';
			this.divMenu.style.zIndex = 10;
		}
		
		return false;
	}
	
	deleteCardMenu() {
		//this.divMenu.style.display = 'none';
		
		if (this.divMenu != null) {
			this.divBackImg.removeChild(this.divMenu);
			this.divMenu = null;
		}
	}
	
	buildMenuItem(divMenu, menuItemInfos) {
	
	    var menuItem = document.createElement("div");
	    menuItem.classList.add('menuCardItem');
	    menuItem.domCard = this;
	    menuItem.menu = divMenu;
	    menuItem.index = menuItemInfos.index;
	    menuItem.setText = (function(menuItem, text) { this.setMenuItemText(menuItem, text); }).bind(this, menuItem);
	
	    
	    if (menuItemInfos.text) {
	    	menuItem.innerHTML = menuItemInfos.text;
	    }
	    
	    if (menuItemInfos.action) {
	    	menuItem.addEventListener("click", this.clickOnMenuItem.bind(menuItem, menuItemInfos) );
	    }
	    
		return menuItem;
	}
	
	setMenuItemText(menuItem, text) {
		if (this.menu != null) {
			this.menu[menuItem.index].text = text;
		}
	}
	
	clickOnMenuItem(menuItemInfos) {
	
		
		// supprime le menu contextuel
		this.menu.style.display = "none";
		
		// joue l'action associé au menu item qui a été cliqué
		menuItemInfos.action(this);
	
	}
	
	addEventListener(event, fct) {
		this.divCard.addEventListener(event, fct);
	}
	
	showCardProperties() {
		
		console.log("*****************************");
		console.log("* id card: " + this.getId());
		console.log("* id zone: " + (this.getZone() == null ? "null" : this.getZone().id));
		console.log("* id divCardsContainer: " + (this.divCardsContainer == null ? "null" : this.divCardsContainer.id));
		console.log("* draggable: " + this.getDraggable());
		
		if (this.metaData != null) {
			console.log("* kind: " + this.metaData.kind);
		} else {
			console.log("* metadata: null");
		}
		
		console.log("*****************************");
	}
}
