const ALLOW_PROPERTY_MNU = false;

class DomCard {

	constructor(card, height, cardDrawMode) {

		// mapping de card vers DomCard
		this.mapCardToDomCard(card);

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
		
		var sizeChange = this.testIfSizeWillChange(card);
		
		this.mapCardToDomCard(card);
		
		if (sizeChange) {
			this.divCard.dispatchEvent(new CustomEvent("sizeChanged", this));
		}
	}
	
	mapCardToDomCard(card) {
		this.id = card.id;
		this.setDamage(card.dammagePoints);
		this.setStatus(card.status);
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
	
	testIfSizeWillChange(card) {

		return ((this.status == null) || 
				((card.status != null) && (this.status.activated != card.status.activated)));
	}
	
	getStatus() {
		return this.status;
	}
	
	setStatus(status) {
		this.status = status;
	}

	getDamage() {
		return this.damage;
	}

	setDamage(damage) {
		this.damage = damage;
	}

	getMetaData() {
		return this.metaData;
	}

	setMetaData(metaData) {
		this.metaData = metaData;
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
		//this.divCard.mouseLeaveEventTarget = (function() { this.deleteCardMenu(); }).bind(this);
		this.divCard.addEventListener('mouseleave',  this.divCard.mouseLeaveEventTarget);
	}
	 
	showCardMenu() {

		if ((this.menu != null) && (this.menu.length)) {
			
			if (this.divBackMenu != null) {
				this.deleteCardMenu();
			}
			
			var menuTop = (this.getWindowTop() + 1) + "px";
			var menuLeft = (this.getWindowLeft() + 1) + "px";
			
			// back menu, utilisé pour définir la zone pour laquelle la sortie du curseur de la souris
			// provoque la fermeture du menu
			var r = this.cardImg.getBoundingClientRect();
			this.divBackMenu = document.createElement("div");
			this.divBackMenu.classList.add("backMenuCardDiv");
			this.divBackMenu.style.top = menuTop;
			this.divBackMenu.style.left = menuLeft;
			this.divBackMenu.style.width = r.width + "px";
			this.divBackMenu.style.height = r.height + "px";
			this.divBackMenu.oncontextmenu = (function() { return false; }).bind(this);
			document.body.appendChild(this.divBackMenu);
			
			// menu
			this.divMenu = document.createElement("div");
			this.divMenu.id = "divMenu_" + this.id;
			this.divMenu.classList.add('menuCardDiv');
			this.divMenu.style.top = "0px";
			this.divMenu.style.left = "0px";
		    this.divMenu.style.display = 'block';
			this.divBackMenu.appendChild(this.divMenu);

		    var menuItemIdex = 0;
		    this.menu.forEach ((function(menuItemInfos) {
		    	menuItemInfos.index = menuItemIdex++;
				this.divMenu.appendChild(this.buildMenuItem(this.divMenu, menuItemInfos));
			}).bind(this));

		    // Traitement des évènements de sortie du curseur de la souris
		    this.divBackMenu.addEventListener("mouseleave", (function() { this.deleteCardMenu(); }).bind(this));
		    //this.divMenu.addEventListener("mouseleave", (function() { this.deleteCardMenu(); }).bind(this));
		}
		
		// doit être retourné pour interdire l'affichage du menu contextuel normal du navigateur
		return false;
	}
	
	deleteCardMenu() {
		
		if (this.divMenu != null) {
			document.body.removeChild(this.divBackMenu);
			this.divBackMenu = null;
			this.divMenu = null;
		}
	}
	
	buildMenuItem(divMenu, menuItemInfos) {

		var menuItem = document.createElement("div");
		menuItem.classList.add('menuCardItem');
		menuItem.domCard = this;
		menuItem.menu = divMenu;
		menuItem.index = menuItemInfos.index;
		menuItem.setText = (function (menuItem, text) {
			this.setMenuItem(menuItem,{ text:text});
		}).bind(this, menuItem);
		menuItem.innerHTML = "";
		if (menuItemInfos.icon) {
			menuItem.innerHTML = "<img src=\"" + menuItemInfos.icon + "\">";
			menuItem.innerHTML += "<div>" + menuItemInfos.text + "</div>";
		} else {
			if (menuItemInfos.text) {
				menuItem.innerHTML = menuItemInfos.text;
			}
		}
	    
	    if (menuItemInfos.action) {
	    	menuItem.addEventListener("click", (function(menuItem, menuItemInfos) { this.clickOnMenuItem(menuItem, menuItemInfos); }).bind(this, menuItem, menuItemInfos) );
	    }

		return menuItem;
	}

	setMenuItem(menuItem,obj) {
		if (this.menu != null) {
			this.menu[menuItem.index].text = obj.text;
			this.menu[menuItem.index].icon = obj.icon;
		}
	}
	
	clickOnMenuItem(menuItem, menuItemInfos) {
	
		
		// supprime le menu contextuel
		this.deleteCardMenu();
		
		// joue l'action associé au menu item qui a été cliqué
		menuItemInfos.action(menuItem);
	
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
	
	getWindowLeft() {
	    var rect = this.cardImg.getBoundingClientRect();
	    var scrollLeft = window.pageXOffset || this.cardImg.scrollLeft;
	    return rect.left + scrollLeft;
	}
	
	getWindowTop() {
	    var rect = this.cardImg.getBoundingClientRect();
	    var scrollTop = window.pageYOffset || this.cardImg.scrollTop;
	    return rect.top + scrollTop;
	}
}
