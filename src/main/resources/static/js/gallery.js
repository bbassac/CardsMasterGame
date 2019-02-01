

document.addEventListener('DOMContentLoaded', function() {
    refreshImages();
}, false);

function refreshImages() {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "stack/DRAW", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);

    var src = document.getElementById("gallery");


    for (var i=0; i< cards.length;i++){

        var div = document.createElement("div");
        div.id="pic"+i;


        var img = document.createElement("img");
        img.src = "img/"+encodeURI(cards[i].path);
        div.appendChild(img);

        var div2 = document.createElement("div");
        if(i>0) {
            var a1 = document.createElement("a");
            a1.className = "previous";
            a1.href = "#pic" + (i - 1);
            a1.textContent = "<";
            div2.appendChild(a1);
        }

        var span = document.createElement("span");
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