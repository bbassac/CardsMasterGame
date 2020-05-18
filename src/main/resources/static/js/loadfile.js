function loadFile(){

    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
        // getting a hold of the file reference
        var file = e.target.files[0];
        var xhttp = new XMLHttpRequest();
        xhttp.open("put", "upload/"+currentPlayerId, false);
        let formData = new FormData();

        var blob = new Blob([file], { type: "multipart/form-data"});
        formData.append("file", blob);
        xhttp.send(formData);

        alert(xhttp.responseText+" cards loaded");
    };

    input.click();


}