

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