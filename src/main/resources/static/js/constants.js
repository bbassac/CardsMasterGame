/**
 * Fichier de constates 
 */
 
// hauteur d'affichage des différentes cartes
const drawImageHeight = 150;
const gameImageHeight = 250;
const opponentCardHeight = 230;
const graveyardHeight = 266;
const trapImageHeight = 150;
const trapIconHeight = 35;
const nbCardsHeight = 30;
const envAndAffinityHeight = 174;
const equipmentHeight = 172;

// hauteur d'affichage des différentes icones
const handIconSize = 30;

// mode d'affichage des cartes
const CARD_DRAW_MODES_STACK = 1;
const CARD_DRAW_MODES_BOARD = 2;


//Menus
const MOVE_TO_BOARD = "&uArr; Déplacer sur le plateau";
const MOVE_TO_TRAP = "&rArr; Déplacer vers les pièges";
const MOVE_TO_EQUIPMENT = "&dArr; Déplacer vers les équipements";
const MOVE_TO_GRAVEYARD = "&#9760; Déplacer vers le cimetière";
const MOVE_TO_HAND = "Déplacer vers la main";
const ACTIVATE = "&#8631; Activer la carte";
const RE_ACTIVATE= "&#8634; Redresser la carte"
const USE = "% Déclencher pouvoir";
const RESET_USE = "% Reset pouvoir";

//ERROR
const ERROR_EQUIPMENT = "Déplacement interdit car la carte n'est pas un équipement";
const ERROR_TRAP = "Déplacement interdit car la carte n'est pas un piège";

//Kinds
const KIND_TRAP = "Piège";
const KIND_EQUIPMENT = "Equipement";

//Chakra
const CHAKRA_PHYSIQUE ="Physique";
const CHAKRA_SPECIAL="Spécial";
const CHAKRA_EAU="Eau";
const CHAKRA_FEU="Feu";
const CHAKRA_FOUDRE="Foudre";
const CHAKRA_TERRE ="Terre";

//THEME
const THEME_BLUE = "blue";
const THEME_RED = "red";
const THEME_GREEN = "green";
const THEME_GREY = "grey";

// Grayards
const MY_GRAVEYARD_ID = "graveyardId";
const OPP_GRAVEYARD_ID = "graveyardOppId";