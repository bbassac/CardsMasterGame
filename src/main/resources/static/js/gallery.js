

document.addEventListener('DOMContentLoaded', function() {
    refreshImages();
}, false);

function copy(i){
    var elem = document.querySelectorAll("textarea[tag=toCopy-"+i+"]");
    elem[0].select();
    console.log("copy " +elem[0].value);
    document.execCommand( 'copy' );
    return false;
} 

function refreshImages() {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "stack/DRAW0", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);

    var src = document.getElementById("gallery");

    document.onkeydown= navigate;

    function navigate(key) {
        key = key || window.event;

       if (key.keyCode ==37){
           console.log("Left");
       }else if (key.keyCode ==39){
           console.log("right");
       }
    }

    for (var i=0; i< cards.length;i++){

        var div = document.createElement("div");
        div.id="pic"+i;


        var img = document.createElement("img");
        img.src = "img/"+encodeURI(cards[i].path);
        div.appendChild(img);

        var textAreaElement = document.createElement("textarea");
        textAreaElement.value = cards[i].path.split("\\")[1];
        textAreaElement.id = "toCopy";
        textAreaElement.setAttribute("tag","toCopy-"+i);

        div.append(textAreaElement);

        var button = document.createElement("button");
        button.id ="buttonCopy";
        button.title="Copy to clipboard";
        button.innerHTML = "Copy";
        button.setAttribute('onclick','copy('+i+');');
        

        div.append(button);

        var div2 = document.createElement("div");
        if(i>0) {
            var a1 = document.createElement("a");
            a1.className = "previous";
            a1.href = "#pic" + (i - 1);
            a1.textContent = "<";
            div2.appendChild(a1);
        }

        var span = document.createElement("textAreaElement");
        span.className="spacer";
        div2.appendChild(span);

        if (i<=cards.length-1) {
            var a2 = document.createElement("a");
            a2.className = "next";
            a2.href = "#pic" + (i + 1);
            a2.textContent = ">";
            div2.appendChild(a2);
        }

        div.appendChild(div2);
        src.appendChild(div);

    }


}