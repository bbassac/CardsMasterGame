class Menu {

    constructor (domCard){
        this.domCard = domCard;
    }

    addMenu(menu) {
        this.menu = menu;

        // ajout d'un item de test mode test
        if (ALLOW_PROPERTY_MNU) {
            this.menu.push({ text: "Log propriétés", action: (function() { this.showCardProperties(); }).bind(this) });
        }

        // affichage du menu contextuel lors d'un clique-droit sur l'image
        this.domCard.cardImg.oncontextmenu = (function() { return this.showCardMenu(); }).bind(this);

        // suppression du menu contextuel lors de la sortie de la souris de l'image
        //this.divCard.mouseLeaveEventTarget = (function() { this.deleteCardMenu(); }).bind(this);
        this.domCard.divCard.addEventListener('mouseleave',  this.domCard.divCard.mouseLeaveEventTarget);
    }

    showCardMenu() {

        if ((this.menu != null) && (this.menu.length)) {

            if (this.domCard.divBackMenu != null) {
                this.deleteCardMenu();
            }

            var menuTop = (this.domCard.getWindowTop() + 1) + "px";
            var menuLeft = (this.domCard.getWindowLeft() + 1) + "px";

            // back menu, utilisé pour définir la zone pour laquelle la sortie du curseur de la souris
            // provoque la fermeture du menu
            var r = this.domCard.cardImg.getBoundingClientRect();
            this.domCard.divBackMenu = document.createElement("div");
            this.domCard.divBackMenu.classList.add("backMenuCardDiv");
            this.domCard.divBackMenu.style.top = menuTop;
            this.domCard.divBackMenu.style.left = menuLeft;
            this.domCard.divBackMenu.style.width = r.width + "px";
            this.domCard.divBackMenu.style.height = r.height + "px";
            this.domCard.divBackMenu.oncontextmenu = (function() { return false; }).bind(this);
            document.body.appendChild(this.domCard.divBackMenu);

            // menu
            this.domCard.divMenu = document.createElement("div");
            this.domCard.divMenu.id = "divMenu_" + this.id;
            this.domCard.divMenu.classList.add('menuCardDiv');
            this.domCard.divMenu.style.top = "0px";
            this.domCard.divMenu.style.left = "0px";
            this.domCard.divMenu.style.display = 'block';
            this.domCard.divBackMenu.appendChild(this.domCard.divMenu);

            var menuItemIdex = 0;
            this.menu.forEach ((function(menuItemInfos) {
                menuItemInfos.index = menuItemIdex++;
                this.domCard.divMenu.appendChild(this.buildMenuItem(this.domCard.divMenu, menuItemInfos));
            }).bind(this));

            // Traitement des évènements de sortie du curseur de la souris
            this.domCard.divBackMenu.addEventListener("mouseleave", (function() { this.deleteCardMenu(); }).bind(this));
            //this.divMenu.addEventListener("mouseleave", (function() { this.deleteCardMenu(); }).bind(this));
        }

        // doit être retourné pour interdire l'affichage du menu contextuel normal du navigateur
        return false;
    }

    deleteCardMenu() {

        if (this.domCard.divMenu != null) {
            document.body.removeChild(this.domCard.divBackMenu);
            this.domCard.divBackMenu = null;
            this.domCard.divMenu = null;
        }
    }

    buildMenuItem(divMenu, menuItemInfos) {

        var menuItem = document.createElement("div");
        menuItem.classList.add('menuCardItem');
        menuItem.domCard = this.domCard;
        menuItem.menu = divMenu;
        menuItem.index = menuItemInfos.index;
        menuItem.setText = (function (menuItem, text) {
            this.setMenuItem(menuItem,{ text:text});
        }).bind(this, menuItem);
        menuItem.innerHTML = "";
        if (menuItemInfos.icon) {
            menuItem.appendChild(menuItemInfos.icon);
            var txtDiv = document.createElement("div");
            txtDiv.innerHTML = menuItemInfos.text;
            menuItem.appendChild(txtDiv);
        } else {
            if (menuItemInfos.text) {
                menuItem.innerHTML = menuItemInfos.text;
            }
        }

        if (menuItemInfos.action) {
            menuItem.addEventListener("click", (function(menuItem, menuItemInfos) { this.clickOnMenuItem(menuItem, menuItemInfos); }).bind(this, menuItem, menuItemInfos) );
        }

        return menuItem;
    }

    setMenuItem(menuItem,obj) {
        if (this.menu != null) {
            this.menu[menuItem.index].text = obj.text;
            this.menu[menuItem.index].icon = obj.icon;
        }
    }

    clickOnMenuItem(menuItem, menuItemInfos) {


        // supprime le menu contextuel
        this.deleteCardMenu();

        // joue l'action associé au menu item qui a été cliqué
        menuItemInfos.action(menuItem);

    }
}