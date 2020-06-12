/**
 * Fichier de constates 
 */
 
// hauteur d'affichage des différentes cartes

const opponentCardHeight = 281;
const gameImageHeight = 281;
const equipmentHeight = 281;
const graveyardHeight = 160;
const oppGraveyardHeight = 160;
const drawImageHeight = 160;
const trapImageHeight = 160;
const envAndAffinityHeight = 160;
const nbCardsHeight = 30;
const trapIconHeight = 35;

// hauteur d'affichage des différentes icones
const handIconSize = 30;

// mode d'affichage des cartes
const CARD_DRAW_MODES_STACK = 1;
const CARD_DRAW_MODES_BOARD = 2;

//Titles
const PICK_A_CARD = "Piocher une carte";
const HIDDEN = "Camouflé";
const STUNED = "Immobilisé";
const RENFORCED="Bonus Environnement actif";

//IMAGES MENU
const IMG_HIDDEN = "img/hidden.png";
const IMG_VISIBLE = "img/visible.png";
const IMG_STUNED = "img/stuned.png";
const IMG_FREE = "img/free.png";
const IMG_ACTIVATE ="img/desactivated.png";
const IMG_DESACTIVATE = "img/activated.png";
const IMG_POWER = "img/power.png";
const IMG_GRAVEYARD="img/graveyard.png";

//Menus
const MOVE_TO_HAND = "Déplacer vers la main";
const ACTIVATE = "Activer la carte";
const RE_ACTIVATE= "Redresser la carte";
const USE = "Activer pouvoir";
const RESET_USE = "Reset pouvoir";
const SET_STUNED = "Immobiliser";
const RESET_STUNED = "Libérer";
const SET_HIDDEN = " Camoufler";
const RESET_HIDDEN = "Rendre visible";
const RESET_TRAP = "Reset piège";
const USE_TRAP = "Déclencher le piège"

// Images des cartes
const CARD_IMG_BACK_DRAW = encodeURI("img/Back-Draw.png");
const CARD_IMG_BACK_AFFINITE = encodeURI("img/Back-Select.png")
const CARD_IMG_BACK_OPPONENT_TRAPS = encodeURI("img/0-Back.jpg")


//ERROR
const ERROR_EQUIPMENT = "Déplacement interdit car la carte n'est pas un équipement";
const ERROR_TRAP = "Déplacement interdit car la carte n'est pas un piège";
const ERROR_DICE = "Saisie invalide. Ex. attendu : 1D6+2D5";
const ERROR_DICE_NUMBER = "Saisie invalide. Maximum 5 dés autorisés.";

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

// Cookies
const COOKIE_PLAYER_ID = "playerId";

// Dés
const MAX_DICES = 5;