/**
 * Lance les scripts de l'application
 */
 
document.addEventListener('DOMContentLoaded', function() {
    refreshBoard();
}, false);

setInterval(refreshByInterval, 500);

refreshBoard();