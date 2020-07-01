const ALLOW_PROPERTY_MNU = false;

class DomCard {

	constructor(card, height, cardDrawMode) {

		// mapping de card vers DomCard
		this.mapCardToDomCard(card);

		this.buildDomElemnts(height, card);
		this.applyStyle(cardDrawMode);
		
        // par défaut la carte ne doit pas être draggable 
        this.setDraggable(false);
		this.menu = new Menu(this);
		
		this.backImgPath = null;
  	}

  	getMenu(){
		return this.menu;
	}

	buildDomElemnts(height, card) {
		
		this.divCard = document.createElement("div");
		
        //this.cardImg = document.createElement("img");
        //this.cardImg.src = "img/" + encodeURI(imgPath);
		this.cardImg = cardCache.getImageCard(card.id, card.path);
        
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
        	this.menu.addMenu([]);
        }
	}
	
	showFront() {
		this.cardImg.src = this.imgPath;
	}
	
	showBack() {
		if (this.backImgPath) {
			this.cardImg.src = this.backImgPath;
		} else {
			this.cardImg.src = CARD_IMG_BACK_DRAW;
		}
	}

	setBackImg(path) {
		if (path) {
			this.backImgPath = path;
		}
		else {
			this.backImgPath = null;
		}
	}
	
	applyStyle(cardDrawMode) {
		
		if (cardDrawMode === CARD_DRAW_MODES_STACK) {
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
		this.imgPath = "img/" + encodeURI(card.path); 
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
				((card.status != null) && (this.status.activated !== card.status.activated)));
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
