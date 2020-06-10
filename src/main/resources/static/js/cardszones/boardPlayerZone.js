class BoardPlayerZone extends CardsZoneScrollableBoard {
	
	constructor() {
		super("boardPlayer", gameImageHeight, THEME_GREEN);
		this.setAsDropZone();
	}

	getCards(playerId) {

		var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "player/"+playerId+"/board", false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();

	    return JSON.parse(xhttp.responseText);
	}

	addSpecificCardElements(domCard) {
		
		this.addDamageButtons(domCard);
		this.addStatus(domCard);
		
	    var activatedText = domCard.getStatus().activated ? RE_ACTIVATE : ACTIVATE;
	    var activatedIcon = domCard.getStatus().activated ? document.menuImgActivate:document.menuImgDesactivate;

	    var usedText = domCard.getStatus().used ? RESET_USE : USE;

	    var hiddenText= domCard.getStatus().hidden ? RESET_HIDDEN : SET_HIDDEN ;
		var hiddenIcon = domCard.getStatus().hidden ? document.menuImgVisible : document.menuImgHidden ;

		var stunedText = domCard.getStatus().stuned ? RESET_STUNED : SET_STUNED;
		var stunedIcon = domCard.getStatus().stuned ? document.menuImgFree : document.menuImgStuned;
	    var menu = [
	        { icon: activatedIcon, text: activatedText, action: (function(domCard, menuItem) { this.flipCard(domCard, menuItem); }).bind(this, domCard) },
	        { icon:document.menuImgPower, text: usedText, action: (function(domCard, menuItem) { this.useCard(domCard, menuItem); }).bind(this, domCard) },
			{ icon:hiddenIcon, text: hiddenText, action: (function(domCard, menuItem) { this.setHidden(domCard, menuItem); }).bind(this, domCard) },
			{ icon: stunedIcon, text: stunedText, action: (function(domCard, menuItem) { this.setStuned(domCard, menuItem); }).bind(this, domCard) }
	    ];
	
	    domCard.getMenu().addMenu(menu);
	    domCard.setDraggable(true);
	}
	
	applySpecificCardProperties(domCard) {
		this.showActivatedState(domCard);
		this.showUsedState(domCard);
		this.showDamage(domCard);
		this.showStatusArea(domCard);
		this.showStatusHidden(domCard);
		this.showStatusStuned(domCard);
		this.showStatusRenforced(domCard);
	}

	allowDrop(fromZoneId, toZoneId, domCard) {
	
		var isEquipment = KIND_EQUIPMENT.localeCompare(domCard.getMetaData().kind) == 0;
		var isTrap = KIND_TRAP.localeCompare(domCard.getMetaData().kind) == 0;
		var isFromHand = fromZoneId.localeCompare(handZone.getZoneId()) == 0; 
		
		return isFromHand && !isTrap && !isEquipment;
	}
	
	drop(fromZoneId, toZoneId, domCard) {
		this.moveCardFromHandToBoardPlayer(domCard);
	}

	addStatus(domCard){

		var divStatus = document.createElement("div");
		divStatus.id = "divstatusArea_" + domCard.getId();
		divStatus.classList.add("divStatusPlayer");
		domCard.divBackImg.appendChild(divStatus);
		
		//manage hidden
		var imgHidden = document.createElement("img");
		imgHidden.id = "imgHiddenOpp_" +  domCard.getId();
		imgHidden.classList.add("imgHiddenPlayer");
		imgHidden.title = HIDDEN;
		divStatus.appendChild(imgHidden);

		//manage renforced
		var imgRenforced = document.createElement("img");
		imgRenforced.id = "imgRenforcedOpp_" +  domCard.getId();
		imgRenforced.classList.add("imgRenforcedPlayer");
		imgRenforced.title = RENFORCED;
		divStatus.appendChild(imgRenforced);

		//manage stuned
		var imgStuned = document.createElement("img");
		imgStuned.id = "imgStunedOpp_" +  domCard.getId();
		imgStuned.classList.add("imgStunedPlayer");
		imgStuned.title = STUNED;
		divStatus.appendChild(imgStuned);

	}

	showStatusArea(domCard) {
		var e = document.getElementById("divstatusArea_" +  domCard.getId());
		if (!domCard.getStatus().hidden && !domCard.getStatus().reinforced && !domCard.getStatus().stuned){
			e.style.display="none";
		}else{
			e.style.display="block";
		}
	}

	showStatusHidden(domCard){

		var e = document.getElementById("imgHiddenOpp_" +  domCard.getId());
		//manage hidden
		if (domCard.getStatus().hidden) {
			e.style.display="block";
		}else{
			e.style.display="none";
		}


	}

	showStatusRenforced(domCard){

		var e = document.getElementById("imgRenforcedOpp_" +  domCard.getId());
		//manage hidden
		if (domCard.getStatus().reinforced) {
			e.style.display="block";
		}else{
			e.style.display="none";
		}

	}

	showStatusStuned(domCard){

		var e = document.getElementById("imgStunedOpp_" +  domCard.getId());
		//manage hidden
		if (domCard.getStatus().stuned) {
			e.style.display="block";
		}else{
			e.style.display="none";
		}

	}
	
	addDamageButtons(domCard) {
		
	    //div de dmg
	    var divDmgArea = document.createElement("div");
	    divDmgArea.id = "divDmgArea_" + domCard.getId();
	    divDmgArea.classList.add('dmgArea');
	    domCard.divBackImg.appendChild(divDmgArea);
	
		// Remove damage button
	    var buttonLessDmg = document.createElement("button");
	    buttonLessDmg.innerHTML = "-";
	    buttonLessDmg.classList.add("buttonActionCard");
	    buttonLessDmg.classList.add("minusDmgButton");
	    buttonLessDmg.addEventListener('click', (function(domCard) { this.changeDmgPoints(domCard, -1); }).bind(this, domCard) );
	    divDmgArea.appendChild(buttonLessDmg);
	
		// Damage counter
	    var divDamage = document.createElement("div");
	    divDamage.id = "damage_" + domCard.getId();
	    divDamage.classList.add("divDmg");
	    divDmgArea.appendChild(divDamage);
	    this.showDamage(domCard);

		// Add damage button
	    var buttonMoreDmg = document.createElement("button");
	    buttonMoreDmg.innerHTML = "+";
	    buttonMoreDmg.classList.add("buttonActionCard");
	    buttonMoreDmg.classList.add("plusDmgButton");
	    buttonMoreDmg.setAttribute("id",domCard.getId());
	    buttonMoreDmg.addEventListener('click', (function(domCard) { this.changeDmgPoints(domCard, 1); }).bind(this, domCard) );
	    divDmgArea.appendChild(buttonMoreDmg);
	}
	
	changeDmgPoints(domCard, damageChange){
	
	    var damage = domCard.getDamage() + damageChange;
	    
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/" + currentPlayerId + "/board/" + domCard.getId() + "/dmg/" + damage, false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    this.fill(currentPlayerId);
	}
	
	showDamage(domCard) {
		
		var divDamage = document.getElementById("damage_" + domCard.getId());

		if (divDamage) {
			divDamage.innerHTML = domCard.getDamage();
			divDamage.style.color = (domCard.getDamage() > 0) ? 'red' : 'black';
		}
	}
	
	flipCard(domCard, menuItem){
	
	    var activated = ! domCard.getStatus().activated;
		
		var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+domCard.getId()+"/activated/"+activated, false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    domCard.getMenu().setMenuItem(menuItem,  {icon:activated ? document.menuImgActivate : document.menuImgDesactivate,text:activated ? RE_ACTIVATE : ACTIVATE});
	    
	    this.fill(currentPlayerId);
	}

	setHidden(domCard,menuItem){
		var hidden = ! domCard.getStatus().hidden;

		var xhttp = new XMLHttpRequest();
		xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+domCard.getId()+"/hidden/"+hidden, false);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send();
		var hiddenIcon = hidden ? document.menuImgVisible : document.menuImgHidden ;
		domCard.getMenu().setMenuItem(menuItem, {icon: hiddenIcon ,text: hidden ? RESET_HIDDEN : SET_HIDDEN });

		this.fill(currentPlayerId);
	}

	setStuned(domCard,menuItem){
		var stuned = ! domCard.getStatus().stuned;

		var xhttp = new XMLHttpRequest();
		xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+domCard.getId()+"/stuned/"+stuned, false);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send();

		domCard.getMenu().setMenuItem(menuItem, {icon :stuned ? document.menuImgFree : document.menuImgStuned ,text:stuned ? RESET_STUNED : SET_STUNED });

		this.fill(currentPlayerId);
	}
	
	showActivatedState(domCard) {
		
		var divStatus = document.getElementById("divstatusArea_" + domCard.getId());
		var divDamage = document.getElementById("divDmgArea_" + domCard.getId());
		
		if (domCard.getStatus().activated) {
			domCard.cardImg.classList.add("activatedCard");
			divStatus.classList.add("statusAreaTurned");
			divDamage.classList.add("dmgAreaTurned");
		} else {
			domCard.cardImg.classList.remove("activatedCard");
			divStatus.classList.remove("statusAreaTurned");
			divDamage.classList.remove("dmgAreaTurned");
		}
	}

	useCard(domCard, menuItem){
	
	    var used = ! domCard.getStatus().used;
	
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+domCard.getId()+"/used/"+used, false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    domCard.getMenu().setMenuItem(menuItem, {icon: document.menuImgPower,text:used ? RESET_USE : USE});
	    
	    this.fill(currentPlayerId);
	}

	showUsedState(domCard) {

		if (domCard.getStatus().used) {
			domCard.cardImg.classList.add("usedCard");
		} else {
			domCard.cardImg.classList.remove("usedCard");
		}
	}

	moveCardFromHandToBoardPlayer(domCard){
	    
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+domCard.getId(), false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    handZone.fill(currentPlayerId);
	    this.fill(currentPlayerId);
	}
}