/**
 * Gestion des cookies
 */


/**
 * Créé ou modifie un cookie.
 * - Si aucun cookie n'est trouvé pour la clé, un nouveau cookie (key/value) est créé.
 * - Si un cookie est trouvé pour cette clé, sa valeur sera modifiée. 
 * @param key clé du cookie à créer ou modifier.
 * @param value valeur à affecter au cookie. 
 */
function setCookie(key, value) {

	key = key.trim();
	
	if (key.length > 0) {
	
		// durée de validité du cookie : 4 heures
		var d = new Date();
		d.setTime(d.getTime() + (4 * 60 * 60 * 1000));
		var expires = "expires="+ d.toUTCString();
		
		document.cookie = key + "=" + value + ";" + expires + ";path=/";
	}
}

/**
 * Lit la valeur d'un cookie.
 * @param key clé du cookie à lire.
 * @return la valeur du cookie si trouvé, undefined sinon.
 */
function getCookie(key) {
	
	var value = undefined;
	
	key = key.trim();
	
	if (key.length > 0) {

		var name = key.trim() + "=";
		
		var decodedCookie = decodeURIComponent(document.cookie);
		var keyValues = decodedCookie.split(';');
		
		var i = 0;
		
		while ((i < keyValues.length) && (!value)) {
			
			var keyValue = keyValues[i];
			
			while (keyValue.charAt(0) == ' ') {
				keyValue = keyValue.substring(1);
			}
			
			if (keyValue.indexOf(name) == 0) {
				value = keyValue.substring(name.length, keyValue.length);
			}
			
			i++;
		}
	}
	
	return value;
	  
}

/**
 * Enregistre un cookie (clé/valeur) sauf si le cookie existe déjà.
 * - Si le cookie existe déjà, sa valeur sera retournée, value passé en paramètre est alors ignoré.
 * - Si le cookies n'existe pas, il sera créé avec key/value et value sera retournée.
 * @return la valeur du cookie (existant ou nouvellement créé) 
 */
function initCookie(key, value) {
	
	var cookieValue = getCookie(key);
	
	if (! cookieValue) {
		setCookie(key, value);
		cookieValue = value;
	}
	
	return cookieValue;
}

/**
 * Supprime un cookie.
 * @param key clé du cookie à supprimer
 */
function deleteCookie(key) {
	
	key = key.trim();
	
	if (key.length > 0) {
		document.cookie = key + "=";
	}
}