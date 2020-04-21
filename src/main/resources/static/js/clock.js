/**
 * Gestion d l'horloge affichée en haut de l'écran 
 */
 
window.onload=function() {
	horloge('div_horloge');
};

function horloge(el) {
	
	if(typeof el=="string") { 
		el = document.getElementById(el);
	}
	
    function actualiser() {
        var date = new Date();
        var str = date.getHours();
        str += ':'+(date.getMinutes()<10?'0':'')+date.getMinutes();
        el.innerHTML = str;
    }
    
    actualiser();
    setInterval(actualiser,1000);
}
 