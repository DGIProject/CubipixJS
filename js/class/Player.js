var DIRECTION = {
    "BAS"    : 0,
    "GAUCHE" : 1,
    "DROITE" : 2,
    "HAUT"   : 3
}

function Player(url, x, y, direction) {
    this.x = x; // (en cases)
    this.y = y; // (en cases)
    this.direction = direction;

    // Chargement de l'image dans l'attribut image
    this.image = new Image();
    this.image.referenceDuPerso = this;
    this.image.onload = function() {
        if(!this.complete)
            throw "Erreur de chargement du sprite nommé \"" + url + "\".";

        // Taille du personnage
        this.referenceDuPerso.largeur = this.width / 4;
        this.referenceDuPerso.hauteur = this.height / 4;
    }
    this.image.src = "img/player/" + url;
}

Player.prototype.drawPlayer = function(context) {
    console.log('drawPlayer');
    console.log(this.image);

    context.drawImage(
        this.image,
        0, (128/4), // Point d'origine du rectangle source à prendre dans notre image
        (128/4), (192/4), // Taille du rectangle source (c'est la taille du personnage)
        (this.x * 32) - ((128/4) / 2) + 16, (this.y * 32) - (192/4) + 24, // Point de destination (dépend de la taille du personnage)
        (128/4), (192/4) // Taille du rectangle destination (c'est la taille du personnage)
    );
}

Player.prototype.getCoordonneesAdjacentes = function(direction) {
    var coord = {'x' : this.x, 'y' : this.y};
    switch(direction) {
        case DIRECTION.BAS :
            coord.y++;
            break;
        case DIRECTION.GAUCHE :
            coord.x--;
            break;
        case DIRECTION.DROITE :
            coord.x++;
            break;
        case DIRECTION.HAUT :
            coord.y--;
            break;
    }
    return coord;
}

Player.prototype.deplacer = function(direction, map) {
    // On ne peut pas se déplacer si un mouvement est déjà en cours !
    if(this.etatAnimation >= 0) {
        return false;
    }

    // On change la direction du personnage
    this.direction = direction;

    // On vérifie que la case demandée est bien située dans la carte
    var prochaineCase = this.getCoordonneesAdjacentes(direction);
    if(prochaineCase.x < 0 || prochaineCase.y < 0 || prochaineCase.x >= map.getWidth() || prochaineCase.y >= map.getHeight()) {
        // On retourne un booléen indiquant que le déplacement ne s'est pas fait,
        // Ça ne coute pas cher et ca peut toujours servir
        return false;
    }

    // On commence l'animation
    this.etatAnimation = 1;

    // On effectue le déplacement
    this.x = prochaineCase.x;
    this.y = prochaineCase.y;

    return true;
}