
<h1>Jeux Naruto</h1>

[TOC levels=2-3]: # "#### Sommaire"
## Table of Contents
  * [Bugs](#bugs)
  * [Background](#background)
  * [Présentation du jeux](#présentation-du-jeux)
    + [Les cartes d'environnement](#les-cartes-d'environnement)
    + [Les cartes de ninjas](#les-cartes-de-ninjas)
      - [La protection](#la-protection)
    + [Les cartes d'équipement](#les-cartes-d'équipement)
    + [Les cartes de quêtes](#les-cartes-de-quêtes)
    + [Les cartes de ninjutsu](#les-cartes-de-ninjutsu)
    + [Les cartes d'invocation](#les-cartes-dinvocation)
    + [Les cartes pièges](#les-cartes-pièges)
  * [Règles](#règles)
    + [Glossaire](#Glossaire-et-mécaniques)
    + [Début de partie](#début-de-partie)
    + [Déroulement d'un tour](#déroulement-d'un-tour)
    + [Définition des symboles](#définition-des-symboles)
    + [Cas particuliers](#cas-particuliers)
  * [Détail des extentions](#détail-des-extentions)
  
## Bugs / Evolutions

* [ ] Ajouter des sorts de destruction d'équipement
* [X] Deporter les PVs des cartes sur un overlay coté gauche des cartes
* [ ] Introduire nouvelle ligne pour cartes équipement adverse
* [X] Passer les boutons dessous les cartes en affichage auto comme le cimetiere
* [ ] Remplacer les scrollbars haurizontales par des boutons s'affichant dynamiquement
* [ ] Dimensions du menu contextuel + Look and feel
* [ ] Déplacement des menus en haut pour gagner de la hauteur
* [ ] Gestion des cartes affinité
* [X] Gestion méta-data
* [ ] Utiliser metadata pour un feedback visuel du current environnement sur les ninjas
* [ ] Utiliser les menus contextuels pour retirer des boutons d'action
* [ ] Etudier un drag&drop pour déplacer les cartes de zone
* [ ] Animation activation carte piege qui s'affiche  
* [ ] Doubler le nombre des invocations
* [ ] ajouter flag camouflé sur carte en jeu
* [X] bug : Pas de MAJ des flèches de scroll lors du changement de joueurs.
* [X] bug : Problème du non effacement des flèches de scroll de la zone hand lors de la supression d'une carte.
* [X] evol : Ajout du scroll par bouton sur la zone des opposants.
* [ ] evol : Position du scroll à mémoriser lors de l'ajout / suppression d'une carte de la zone de scroll --> A architecturer.
* [X] evol : POC : Mettre en place le drag-and-drop sur au moins une interaction entre zones.
* [ ] evol : Mettre en place le drag-and-drop sur toutes les interactions entre zones (si POC ok).
* [X] Mettre des commentaires sur boardArea.js.

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

* Cette compétence particulière oblige l'adversaire à éliminer tous les alliés disposant de protection avec de pouvoir attaquer les autres ou même le héros au corps à corps ou à distance.  
* Cette compétence n'affecte pas les ninjutsus ou les compétences des alliés, sauf si celles-ci sont en rapport avec du combat au corps à corps ou à distance

### Les cartes d'équipement

Exemple de carte                        | Description
:--------------------------------------:|----------------------------------
<img src="https://raw.githubusercontent.com/bbassac/CardsMasterGame/master/src/main/resources/static/img/doc/arme.png" width="350px"> | A. Nom de l'équipement <br/>B. Coût de la carte équipement<br />  C. Restriction sur l'emplacement de l'équipement (1 max) <br /> D. Valeur d'attaque de l'équipement  <br />E. Descriptif de l'équipement  <br />F. Nom de l'extension dans laquelle apparaît la carte  

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

### Glossaire et mécaniques

* Protection :
    * Sur un équipement, permet de pouvoir absorber (ou pas au choix) des dégâts. L'excédant de dégats est infligé au porteur
    * Sur un personnage, celui peut s'interposer (ou pas au choix) et subir les dégats à la place du personnage ciblé, que ce soit pour une 
    attaque au corps à corps comme à distance

* Immobiliser : Un personnage ne peut lancer d'attaque directe (corps à corps) s'il est immobilisé, mais peut toujours lancer des sorts

* Piège : carte posée face cachée qui se déclenche automatiquement la première fois que les conditions sont remplies

* Armes de héros  : Si le héros utilise son arme pour attaquer, celle-ci ne sera pas utilisable lors de la défense.

* Bonus de Ninja :  Sauf si précisé, quand un ninja donne un bonus à d'autres, lui-même ne peut en bénéficier

* Arme à distance : Attaque éffectuée sans contre-attaque possible

### Début de partie

* Pioche : 5 cartes
* Points de vie au Max
* Points de chakra à 0

### Déroulement d'un tour

1. Augmentation du nombre de chakra de 1, sans dépasser la valeur max choisie (10 par défaut), sauf dans certains spécifiques détaillés dans les cartes.

2. Pioche d'une carte dans la pile et mise dans la main.

3. Mise en jeu des cartes Armes/armures/sorts/alliés ....

4. Déclenchement des sorts instantanés

5. Lancement des combats corps à corps

6. Lancements des sorts

7. Attaque du héros au corps à corps
    

### Définition des symboles

#### Symbole activation <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/activate.png" height="20" width="20">

* Le sort ne peut être lancé qu'au tour suivant l'invocation de l'allié
* Par convention, la carte est alors inclinée, pour indiquer que le pouvoir a été consommé.
* Si un ninja lance un sort par activation, il peut également attaquer le même tour

#### Symbole infini <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/permanent.png" height="20" width="20">

* Le sort n'est déclenchable/applicable qu'au tour suivant la pose ou celui de l'adversaire
* Il peut être actif soit à chaque tour, soit à chaque tour de chaque joueur, soit tout le temps suivant le pouvoir de la carte

#### Symbole éclair <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/Instantané.png" height="20" width="20">

* Le sort est déclenchable dès la pose de la carte, s'il ne l'est pas à ce moment, il ne pourra plus être lancé

#### Symbole point d'exclamation <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/Spécial.png" height="20" width="20">

* Le texte s'active selon des conditions particulières, et même pendant le tour adverse

#### Symbole de conditions <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/Conditions.png" height="20" width="20">

#### Cumul des symboles

* <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/permanent.png" height="20" width="20">
  <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Symbols/Instantané.png" height="20" width="20"> 
  : Ninjutsu permanent et actif immédiatement 


## Détail des extentions

### Naruto Shippuden <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Elements/Shippuden.png" height="20" width="20">

* Tous les personnages apparaissant dans la série Naruto Shippuden

### Boruto <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Elements/Boruto.png" height="20" width="20">

* Tous les personnages apparaissant dans la série Boruto

### Ninja Armory <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Elements/Weapon.png" height="20" width="20">

* L'amurerie ninja met à votre disposition toute une panoplie d'équipements afin d'affronter votre adversaire comme des armes, des armures,des accessoires ....

### Ninja Scrolls <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Elements/Scrolls.png" height="20" width="20">

* De puissants Ninjutsu ont été redécouverts, mais le prix à payer peut être lourd ! 

### Naruto Stories <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Elements/Book.png" height="20" width="20">

* Les plus grandes quêtes de l'histoire de Naruto enfin disponibles dans le jeu

### Naruto's Ambush <img src="https://raw.githubusercontent.com/vpoiaghi/CardsMaster/master/data/Resources/Elements/Trap.png" height="20" width="20">  

* Saurez vous déjouer les pièges les plus sournois ?
* Vous pouvez poser faces cachées jusqu'à 3 cartes pièges qui peuvent se déclencher pendant le tour adverse, plongeant l'adversaire dans le tourment
