

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

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "stack/ALL", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);

    var selectList = document.getElementById("cardList");
    for (var i=0; i< cards.length;i++){
        var option = document.createElement("option");
        option.value = cards[i].id;
        option.tag=cards[i].path;
        option.text = cards[i].path.split("\\")[1];
        selectList.appendChild(option);
    }

    selectList.options[0].selected = 'selected';
    display();

}

function display(){
    var selectList = document.getElementById("cardList");
    var imgPath = selectList.options[selectList.selectedIndex].tag;
 
    var img = document.getElementById("vignetteID");
    img.src ="img"+imgPath

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

}

function remove(){
    var selectList = document.getElementById("deckList");
    selectList.removeChild( selectList.options[selectList.selectedIndex]); 
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
	  var blob = new Blob([xhttp.response], {type: "text/plain"});
	  saveAs(blob, "Deck.txt"); 
	};


    xhttp.send(json);
    
}