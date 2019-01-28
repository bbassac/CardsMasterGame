# Bugs
- [ ] cimetiere vers main -> doit refresh la main
- [x] mise en relief des points de dmg

# Règles
## Début de partie
* Pioche : 5 cartes
* Points de vie au Max
* Points de chakra à 0

## Déroulement d'un tour

1. Augmentation du nombre de chakra jusqu'à la valeur max choisie (10 par défaut), sauf dans certains spécifiques détaillés dans les cartes

2. Pioche d'une carte dans la pile et mise dans la main


## Définition des symboles

#### Symbole activation <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/activate.png" height="20" width="20">
* Le sort ne peut être lancé qu'au tour suivant l'invocation de l'allié
* Si un ninja lance un sort par activation, il peut également attaquer le même tour

#### Symbole infini <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/permanent.png" height="20" width="20">
* chaque tour mais apres un tour d'invocation

#### Symbole éclair <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/Instantané.png" height="20" width="20">

#### Symbole point d'exclamation <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/Spécial.png" height="20" width="20">

#### Symbole de conditions <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/Conditions.png" height="20" width="20">

#### Cumul des symboles
* <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/permanent.png" height="20" width="20">
  <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/Instantané.png" height="20" width="20"> : Ninjutsu déclenchable à chaque tour, y compris celui de pose 

## Cas particuliers
* Quand un ninja donne un bonus à d'autres, lui-même ne peut en bénéficier

