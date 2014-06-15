var DUREE_ANIMATION = 4;
var DUREE_DEPLACEMENT = 15;

function Mob(id, type, x, y, direction) {
    this.id = id;
    this.type = type;
    this.x = x;
    this.y = y;
    this.direction = direction;

    this.image = new Image();
    this.image.onload = function() {
        if(!this.complete)
            throw "Erreur de chargement du sprite nommé \"" + 'mob01.png' + "\".";
    };

    this.image.src = "view/img/mob/" + 'mob01.png';

    this.mobImage = {
        "width" : this.image.width / 4,
        "height" : this.image.height / 4
    }
}

Mob.prototype.drawMob = function(context) {
    var frame = 0; // Numéro de l'image à prendre pour l'animation
    var decalageX = 0, decalageY = 0; // Décalage à appliquer à la position du personnage
    if(this.etatAnimation >= DUREE_DEPLACEMENT) {
        // Si le déplacement a atteint ou dépassé le temps nécéssaire pour s'effectuer, on le termine
        this.etatAnimation = -1;
    } else if(this.etatAnimation >= 0) {
        // On calcule l'image (frame) de l'animation à afficher
        frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
        if(frame > 3) {
            frame %= 4;
        }

        // Nombre de pixels restant à parcourir entre les deux cases
        var pixelsAParcourir = 32 - (32 * (this.etatAnimation / DUREE_DEPLACEMENT));

        // À partir de ce nombre, on définit le décalage en x et y.
        if(this.direction == 3) {
            decalageY = pixelsAParcourir;
        } else if(this.direction == 0) {
            decalageY = -pixelsAParcourir;
        } else if(this.direction == 1) {
            decalageX = pixelsAParcourir;
        } else if(this.direction == 2) {
            decalageX = -pixelsAParcourir;
        }

        // On incrémente d'une frame
        this.etatAnimation++;
    }

    /*
     * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile,
     * donc il nous suffit de garder les valeurs 0 pour les variables
     * frame, decalageX et decalageY
     */

    context.drawImage(
        this.image,
        this.mobImage.width * frame, this.direction * this.mobImage.height, // Point d'origine du rectangle source à prendre dans notre image
        this.mobImage.width, this.mobImage.height, // Taille du rectangle source (c'est la taille du personnage)
        // Point de destination (dépend de la taille du personnage)
        (this.x * 32) - (this.mobImage.width / 2) + 16 + decalageX, (this.y * 32) - this.mobImage.height + 24 + decalageY,
        this.mobImage.width, this.mobImage.height // Taille du rectangle destination (c'est la taille du personnage)
    );
};

Mob.prototype.getNextPos = function(direction) {
    var coord = {'x' : this.x, 'y' : this.y};

    switch(direction) {
        case 0 :
            coord.y++;
            break;
        case 1 :
            coord.x--;
            break;
        case 2 :
            coord.x++;
            break;
        case 3 :
            coord.y--;
            break;
    }

    return coord;
};

Mob.prototype.moveMob = function(map) {
    if(this.etatAnimation >= 0)
    {
        return false;
    }

    var direction = this.direction;

    var nextCase = this.getNextPos(direction);

    if(nextCase.x < 0 || nextCase.y < 0 || nextCase.x >= map.getWidth() || nextCase.y >= map.getHeight() || !this.isGoodBlock(map, direction))
    {
        this.direction = this.getInverseDirection(this.direction);

        return false;
    }

    this.etatAnimation = 1;

    this.x = nextCase.x;
    this.y = nextCase.y;

    map.detectCollisionMob(this.x, this.y);

    return true;
};

Mob.prototype.isGoodBlock = function(map, direction) {
    var nextBloc;

    switch (direction) {
        case 3 :
            nextBloc = this.getBlock(map, 1);
            break;
        case 0 :
            nextBloc = this.getBlock(map, 2);
            break;
        case 1 :
            nextBloc = this.getBlock(map, 3);
            break;
        case 2 :
            nextBloc = this.getBlock(map, 4);
            break;
        default :
            return false;
    }

    return nextBloc != 2;
};

Mob.prototype.getBlock = function(map, block) {
    var xBlock = this.x % map.getWidth();
    var yBlock = this.y % map.getHeight();

    if(block == 0)
    {
        return map.land[yBlock][xBlock];
    }
    else if(block == 1)
    {
        return map.land[yBlock - 1][xBlock];
    }
    else if(block == 2)
    {
        return map.land[yBlock + 1][xBlock];
    }
    else if(block == 3)
    {
        return map.land[yBlock][xBlock - 1];
    }
    else if(block == 4)
    {
        return map.land[yBlock][xBlock + 1];
    }
    else
    {
        return false;
    }
};

Mob.prototype.getInverseDirection = function(direction) {
    switch (direction) {
        case 0 :
            return 3;
        case 1 :
            return 2;
        case 2 :
            return 1;
        case 3 :
            return 0;
        default :
            return false;
    }
};