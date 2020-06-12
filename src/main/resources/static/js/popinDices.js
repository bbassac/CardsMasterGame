function displayPopinDices() {
	showDicesPopin();
	
	hideError();
	hideTotal();
	
	var divDices = document.getElementById("popinDicesResultWrapper");
	divDices.innerHTML = "";	
	
	var input = document.getElementById("popinDicesInput");
	input.value = "";
	input.onkeypress = function() { throwDice(event, this.value); };
	input.focus();
}

function throwDice(event, diceExp){

    if (event.keyCode === 13) {
    	sendDices(diceExp);
    }
}

function showError(errMessage) {
	var errDiv = document.getElementById("popinDicesErrorDiv");
	errDiv.innerHTML = errMessage;
	errDiv.style.display = "block";
}

function hideError() {
	var errDiv = document.getElementById("popinDicesErrorDiv");
	errDiv.style.display = "none";
}

function hideTotal() {
	var errDiv = document.getElementById("popinTotalDicesResultDiv");
	errDiv.style.display = "none";
}

function sendDices(diceExp) {
	
	hideError();
	hideTotal();
	
	diceExp = diceExp.toUpperCase();
	var maxDicesValues = getMaxDicesValues(diceExp);
	
	if (maxDicesValues.length > MAX_DICES) {
		showError(ERROR_DICE_NUMBER);
	
	} else {
	    var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "dice/" + diceExp, false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    
	    if (xhttp.status !== 200) {
	    	showError(ERROR_DICE);
	    	
	    } else {
		    var result = JSON.parse(xhttp.responseText);
		
		    var finalDices = getDicesValues(result.detail);
		    
		    showDices(finalDices, maxDicesValues);
	    }
	}
}

function getDicesValues(detail) {
	
    var d = detail.replace(/\+/g, ',').replace(/\[/g, '').replace(/\]/g, '');
    
    var dices = d.split(',');
    var dicesValues = [];
    
    dices.forEach(dice => dicesValues.push(parseInt(dice.trim())));

    return dicesValues;
}

function getMaxDicesValues(diceExp) {
	
    var dices = diceExp.split('+');
    var dicesMaxValues = [];
    
    dices.forEach(function(dice) {
    	
    	var elements = dice.split('D');
    	var n = elements[0];
    	var s = elements[1];
    	
    	for (var i = 0; i < n; i++) {
    		dicesMaxValues.push(parseInt(s.trim()));	
    	}
    });

    return dicesMaxValues;
}

function showDices(finalDices, maxDicesValues) {
	
	var divDices = document.getElementById("popinDicesResultWrapper");
	divDices.innerHTML = "";
	divDices.style.width = (75 * finalDices.length) + "px";
	
	var dicesText = [];
	
	for (var i = 0; i < finalDices.length; i++) {
		var diceDiv = document.createElement("div");
		diceDiv.style.backgroundImage = "url('img/wood_dice.png')";
		divDices.appendChild(diceDiv);
		
		var p  = document.createElement("p");
		p.classList.add("diceValue");
		diceDiv.appendChild(p);
		dicesText.push(p);
		
		p  = document.createElement("p");
		p.classList.add("diceMaxValue");
		diceDiv.appendChild(p);
		p.innerHTML = maxDicesValues[i];
		
	}
	
	var loopCount = 10;
	setTimeout(loopDices, 100, loopCount, maxDicesValues, dicesText, finalDices);
}

function loopDices(loopCount, maxDicesValues, dicesText, finalDices) {
	
	loopCount--;

	if (loopCount === 0) {
		showResults(dicesText, finalDices);
		showTotal(finalDices);

	} else {
		
		var rndDices = [];
		
		for (var i = 0; i < dicesText.length; i++) {
			rndDices.push(getRnd(1, maxDicesValues[i]));
		}
		
		showResults(dicesText, rndDices);
		setTimeout(loopDices, 100, loopCount, maxDicesValues, dicesText, finalDices);

	}
}

function getRnd(min, max) {
	return Math.floor(Math.random() * (max + 1)) + min; 
}

function showResults(dicesText, dices) {
	
	for (var i = 0; i < dices.length; i++) {
		dicesText[i].innerHTML = dices[i];
	}
}
	
function showTotal(dices) {
	
	var ttl = 0;
	
	for (var i = 0; i < dices.length; i++) {
		ttl += dices[i];
	}
	
	var errDiv = document.getElementById("popinTotalDicesResultDiv");
	errDiv.innerHTML = ttl;
	errDiv.style.display = "block";
}