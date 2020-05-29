function loadImage(path) {
    var img = new Image();
    img.src = path;
    return img;
}

document.menuImgHidden = loadImage(IMG_HIDDEN);
document.menuImgVisible = loadImage(IMG_VISIBLE);
document.menuImgActivate=loadImage(IMG_ACTIVATE);
document.menuImgDesactivate=loadImage(IMG_DESACTIVATE);
document.menuImgStuned=loadImage(IMG_STUNED);
document.menuImgFree=loadImage(IMG_FREE);
document.menuImgPower=loadImage(IMG_POWER);
document.menuImgGraveyard = loadImage(IMG_GRAVEYARD);