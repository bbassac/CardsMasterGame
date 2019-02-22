# Jeux Naruto

## Bugs

- [ ] Homogénéiser le sort de soin  (permanent VS activate 1x/tour)
- [ ] Cimetiere vers main -> doit refresh la main
- [ ] Ajouter des sorts de destruction d'équipement
- [ ] Ajouter https://fr.wikipedia.org/wiki/Personnages_secondaires_du_Pays_des_Neiges
- [x] Izanagi de Danzo !!
- [x] Mise en relief des points de dmg
- [x] Remplacer les +1/+1 par +1 ATK / +1 PV
- [x] Remplacer les nature genjutsu par Spécial et élément Genjutsu

## Background

Alerte !  Le pays est attaqué !  
Organisez la défense de votre térritoire à l'aide des ressources mises à votre disposition,
et anéantissez le héros adverse qui cherchera à en faire autant contre vous !  
Vous aurez l'occasion de combatre dans tous les lieux renommés de Naruto avec tous les personnages rencontrés lors de ses aventures.  
Equipez vous d'armes légendaires, recrutez de puissants mercenaires, lancez de puissants ninjutsus ...  
Tous les coups sont permis .... surtout les pires !

## Présentation du jeux

### Les cartes d'environnement
Exemple de carte                        | Description
:--------------------------------------:|----------------------------------
<img src="https://raw.githubusercontent.com/bbassac/CardsMasterGame/master/src/main/resources/static/img/doc/environnement.png" width="350px"> | A. Nom du lieu  <br />B. Nature de l'affinité du lieu  <br />C. Intitullé du pouvoir pour l'ensemble de la partie  

### Les cartes de ninjas
Exemple de carte                        | Description
:--------------------------------------:|----------------------------------
<img src="https://raw.githubusercontent.com/bbassac/CardsMasterGame/master/src/main/resources/static/img/doc/ninja.png" width="350px"> | A. Nom du ninja  <br />B. Coût de la carte  <br />C. Nature de l'affinité de l'invocation  <br />D. Valeur de l'attaque de base du ninja  <br />E. Intitullé du pouvoir du ninja  <br />F. Nom de l'extension dans laquelle apparaît la carte  <br />G. Nombre de PV de la carte  

#### La protection

Cette compétence particulière oblige l'adversaire à éliminer tous les alliés disposant de protection avec de pouvoir attaquer les autres ou même le héros au corps à corps ou à distance.  
Cette compétence n'affecte pas les ninjutsus ou les compétences des alliés, sauf si celles-ci sont en rapport avec du combat au corps à corps ou à distance

### Les cartes d'équipement

Exemple de carte                        | Description
:--------------------------------------:|----------------------------------
<img src="https://raw.githubusercontent.com/bbassac/CardsMasterGame/master/src/main/resources/static/img/doc/arme.png" width="350px"> | <img src="https://raw.githubusercontent.com/bbassac/CardsMasterGame/master/src/main/resources/static/img/doc/armure.png" width="350px">

### Les cartes de quêtes
Exemple de carte                        | Description
:--------------------------------------:|----------------------------------
<img src="https://raw.githubusercontent.com/bbassac/CardsMasterGame/master/src/main/resources/static/img/doc/quete.png" width="350px"> | A. Nom de la quête <br/>B. Les cartes de quête n'ont pas de coût, elle se mettent en jeu sitôt les conditions réunies <br />  C. Rappel du type de carte  <br />D. Condition(s) de déclenchement de la quête  <br />E. Récompense d'accomplissement de la quête  <br />F. Nom de l'extension dans laquelle apparaît la carte  

### Les cartes de ninjutsu
Exemple de carte                        | Description
:--------------------------------------:|----------------------------------
<img src="https://raw.githubusercontent.com/bbassac/CardsMasterGame/master/src/main/resources/static/img/doc/kinjutsu.png" width="350px"> | A. Nom du ninjutsu  <br>B. Coût de la carte <br>ninjutsu  <br>C. Nature du ninjutsu  <br>D. Conditions d'utilisation et effets  <br>E. Parfois les sorts ont un effet négatif à appliquer selon la règle écrite  <br>F. Nom de l'extension dans laquelle apparaît la carte  

### Les cartes d'invocation
Exemple de carte                        | Description
:--------------------------------------:|----------------------------------
<img src="https://raw.githubusercontent.com/bbassac/CardsMasterGame/master/src/main/resources/static/img/doc/invocation.png" width="350px"> | A. Nom de l'invocation  <br />B. Les cartes d'invocation n'ont pas de coût  <br />C. Nature de l'affinité de l'invocation  <br />D. Rareté de la carte  <br />E. Intitulé du pouvoir de l'invocation  <br />F. Valeur de l'attaque de base de l'invocation  <br />G. Nom de l'extension dans laquelle apparaît la carte  <br />H. Nombre de PV de la carte  

### Les cartes pièges
Exemple de carte                        | Description
:--------------------------------------:|----------------------------------
<img src="https://raw.githubusercontent.com/bbassac/CardsMasterGame/master/src/main/resources/static/img/doc/piege.png" width="350px"> | A. Nom de la carte piège  <br />B. Coût de la carte piège  <br />C. Nature du piège <br />D. Conditions de déclenchement du piège  <br /> E. Nom de l'extension dans laquelle apparaît la carte  

## Règles

### Début de partie

- Pioche : 5 cartes
- Points de vie au Max
- Points de chakra à 0

### Déroulement d'un tour

1. Augmentation du nombre de chakra de 1, sans dépasser la valeur max choisie (10 par défaut), sauf dans certains spécifiques détaillés dans les cartes.

2. Pioche d'une carte dans la pile et mise dans la main.

3. Mise en jeu des cartes Armes/armures/sorts/alliés ....

4. Déclenchement des sorts instantanés

5. Lancement des combats corps à corps

6. Lancements des sorts

7. Attaque du héros au corps à corps
    - Si le héros utilise son arme pour attaquer, celle-ci ne sera pas utilisable lors de la défense.

### Définition des symboles

#### Symbole activation <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/activate.png" height="20" width="20">

- Le sort ne peut être lancé qu'au tour suivant l'invocation de l'allié
- Si un ninja lance un sort par activation, il peut également attaquer le même tour

#### Symbole infini <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/permanent.png" height="20" width="20">

- Le sort n'est déclenchable qu'au tour suivant la pose ou celui de l'adversaire dans le cas de la Protection 
- Il peut être actif soit à chaque tour, soit à chaque tour de chaque joueur, soit tout le temps suivant le pouvoir de la carte

#### Symbole éclair <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/Instantané.png" height="20" width="20">

- Le sort est déclenchable dès la pose de la carte, s'il ne l'est pas à ce moment, il ne pourra plus être lancé

#### Symbole point d'exclamation <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/Spécial.png" height="20" width="20">

- Le texte s'active selon des conditions particulières, et même pendant le tour adverse

#### Symbole de conditions <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/Conditions.png" height="20" width="20">

#### Cumul des symboles

- <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/permanent.png" height="20" width="20">
  <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/Instantané.png" height="20" width="20"> : Ninjutsu déclenchable à chaque tour, y compris celui de pose 

### Cas particuliers

- Quand un ninja donne un bonus à d'autres, lui-même ne peut en bénéficier

## Détail des extentions

### Naruto Shippuden <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Elements/Shippuden.png" height="20" width="20">
    
    - Tous les personnages apparaissant dans la série Naruto Shippuden

### Boruto <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Elements/Boruto.png" height="20" width="20">
    
    - Tous les personnages apparaissant dans la série Boruto

### Ninja Armory <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Elements/Weapon.png" height="20" width="20">
    
    -  Contient l'ensemble des équipements nécéssaire à tout bon ninja : Armes, Armures, accessoires ....

### Ninja Scrolls <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Elements/Scrolls.png" height="20" width="20">
    
    - De puissants Ninjutsu ont été redécouverts, mais le prix à payer peut être lourd ! 

### Naruto Stories <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Elements/Book.png" height="20" width="20">
    
    - Les plus grandes quêtes de l'histoire de Naruto enfin disponibles dans le jeu

### Naruto's Ambush <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Elements/Trap.png" height="20" width="20">
    
    - Saurez vous déjouer les pièges les plus sournois ?
    - Vous pouvez poser faces cachées jusqu'à 3 cartes pièges qui peuvent se déclencher pendant le tour adverse, plongeant l'adversaire dans le tourment
