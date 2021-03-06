

document.addEventListener('DOMContentLoaded', function() {
    refreshImages();
}, false);

function copy(i){
    var elem = document.getElementById("textAreaId");
    elem.select();
    console.log("copy " +elem.value);
    document.execCommand( 'copy' );
    return false;
} 

function refreshImages() {
    var selectList = document.getElementById("cardList");
    var length = selectList.options.length;
    for (i = length-1; i >= 0; i--) {
        selectList.options[i] = null;
    }

    var xhttp = new XMLHttpRequest();
    var criterias ="";
    var namefilter =  document.getElementById("nameFilter").value;
    var chakraFilter =  document.getElementById("chakra-select").value;
    var costFilter = document.getElementById("costFilter").value;
    var atkFilter = document.getElementById("atqFilter").value;
    var defFilter = document.getElementById("defFilter").value;

    if (namefilter) {
        criterias += ("name:"+namefilter+",")
    }
    if (chakraFilter) {
        criterias += ("chakra:"+chakraFilter+",")
    }
    if (costFilter){
        criterias += ("cost" + document.getElementById("cost-operator").value + costFilter+",");
    }
    if (atkFilter){
        criterias += ("attack" + document.getElementById("atk-operator").value + atkFilter+",");
    }
    if (defFilter){
        criterias += ("defense" + document.getElementById("def-operator").value + defFilter+",");
    }


    xhttp.open("GET", "stack/search?filters="+criterias, false);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);

    var selectList = document.getElementById("cardList");
    for (var i=0; i< cards.length;i++){
        var option = document.createElement("option");
        option.value = cards[i].id;
        option.text = cards[i].path;
        selectList.appendChild(option);
    }
    //auto delect first
    //selectList.options[0].selected = 'selected';
    document.getElementById("filterCounterId").innerText = cards.length + " Cards"
    display();

    updateCounter(0);
}

function display(){
    var selectList = document.getElementById("cardList");
    var imgPath = selectList.options[selectList.selectedIndex].text;
 
    var img = document.getElementById("vignetteID");
    img.src ="img"+imgPath;

    var textArea = document.getElementById("textAreaId");
    textArea.value = imgPath;
}

function displayDeck(){
    var selectList = document.getElementById("deckList");
    var imgPath = selectList.options[selectList.selectedIndex].text;
 
    var img = document.getElementById("vignetteID");
    img.src ="img"+imgPath;

    var textArea = document.getElementById("textAreaId");
    textArea.value = imgPath;

}

function add(){
    var textArea = document.getElementById("textAreaId");
    var card = textArea.value;

    var selectList = document.getElementById("deckList");
    var opt = document.createElement('option');

    // create text node to add to option element (opt)
    opt.appendChild( document.createTextNode(card) );

    // set value property of opt
    opt.value = card; 

    // add opt to end of select box (sel)
    selectList.appendChild(opt); 
    document.getElementById("cardList").focus();
    updateCounter(selectList.options.length);
}

function remove(){
    var selectList = document.getElementById("deckList");
    selectList.removeChild( selectList.options[selectList.selectedIndex]); 
    selectList.focus();
    updateCounter(selectList.options.length);
}

function save(){
  

    var selectList = document.getElementById("deckList");
    var text=[];
    for (var i = 0; i< selectList.options.length;i++){
        text.push(selectList.options[i].value);
                
    }
    var json = JSON.stringify(text);
    var xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "deck", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    
    xhttp.responseType = "arraybuffer";
	
	xhttp.onload = function(oEvent) {
	  var blob = new Blob([xhttp.response], {type: "text/plain;charset=utf-8"});
	  saveAs(blob, "Deck.txt"); 
	};


    xhttp.send(json);
    
}

function updateCounter(nbCards){
    var spanCounter = document.getElementById("libelleCounterId");
    spanCounter.innerText=nbCards + " Cards";

}

function loadDeck(){

    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
        // getting a hold of the file reference
        var file = e.target.files[0];
        var selectList = document.getElementById("deckList");

        var reader = new FileReader();
        reader.onload = function(progressEvent){      
          // By lines
          var lines = this.result.split('\n');
          for(var line = 0; line < lines.length; line++){
            if (lines[line] != ""){
                console.log(lines[line]);
                var opt = document.createElement('option');

                // create text node to add to option element (opt)
                opt.appendChild( document.createTextNode(lines[line]) );
            
                // set value property of opt
                opt.value = lines[line]; 
            
                // add opt to end of select box (sel)
                selectList.appendChild(opt); 
            }

          }
          updateCounter(selectList.options.length);
        };
        reader.readAsText(file,"UTF-8");



    };

    input.click();
}