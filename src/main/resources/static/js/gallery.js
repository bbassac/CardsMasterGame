

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
        var table = document.createElement("TABLE");
        var row = table.insertRow(0);
        var columnindex = 0;
        var img = document.createElement("img");
        img.src = "img/"+encodeURI(cards[i].path);

        if(i>0) {
            var a1 = document.createElement("a");
            a1.className = "previous";
            a1.href = "#pic" + (i - 1);
            a1.textContent = "<";
            //div.appendChild(a1);

            var cell1 = row.insertCell(columnindex);
            columnindex++;
            cell1.appendChild(a1)
        }
        var cellImg = row.insertCell(columnindex);
        columnindex++;
        cellImg.appendChild(img);


        if (i<=cards.length-1) {
            var a2 = document.createElement("a");
            a2.className = "next";
            a2.href = "#pic" + (i + 1);
            a2.textContent = ">";
            div.appendChild(a2);
            var cell2 = row.insertCell(columnindex);
            columnindex++;
            cell2.appendChild(a2)
        }

        div.appendChild(table);
        src.appendChild(div);

    }
}