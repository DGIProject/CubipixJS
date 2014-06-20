var DIRECTION = {
    "DOWN"    : 0,
    "LEFT" : 1,
    "RIGHT" : 2,
    "UP"   : 3
};

var DUREE_ANIMATION = 4;
var DUREE_DEPLACEMENT = 15;

function Player(id, username, url, x, y, direction, online) {
    this.id = id;
    this.username = username;
    this.usernameUId = null;
    this.x = x;
    this.y = y;
    this.lastX = 0;
    this.lastY = 0;
    this.direction = direction;
    this.etatAnimation = -1;

    this.keyControls = {
        'UP' : 0,
        'LEFT' : 0,
        'RIGHT' : 0,
        'DOWN' : 0
    };

    this.loadSprite(url);

    this.health = 10;
    this.updateHealth(0, false);

    this.coins = 0;
    this.updateCoins(0, false);

    this.timeElapsed = 0;

    this.online = online;
}

Player.prototype.loadSprite = function(url) {
    this.image = new Image();
    this.image.playerImageSRC = { "width" : 0, "height" : 0 };
    this.playerImage = this.image.playerImageSRC;
    this.image.onload = function() {
        if(!this.complete)
            throw "Erreur de chargement du sprite nommé \"" + url + "\".";

        this.playerImageSRC.width = this.width / 4;
        this.playerImageSRC.height = this.height / 4;
    };

    this.image.src = 'view/img/player/' + url;
};

Player.prototype.drawPlayer = function(context) {
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
        if(this.direction == DIRECTION.UP) {
            decalageY = pixelsAParcourir;
        } else if(this.direction == DIRECTION.DOWN) {
            decalageY = -pixelsAParcourir;
        } else if(this.direction == DIRECTION.LEFT) {
            decalageX = pixelsAParcourir;
        } else if(this.direction == DIRECTION.RIGHT) {
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
        this.playerImage.width * frame, this.direction * this.playerImage.height, // Point d'origine du rectangle source à prendre dans notre image
        this.playerImage.width, this.playerImage.height, // Taille du rectangle source (c'est la taille du personnage)
        // Point de destination (dépend de la taille du personnage)
        (this.x * 32) - (this.playerImage.width / 2) + 16 + decalageX, (this.y * 32) - this.playerImage.height + 24 + decalageY,
        this.playerImage.width, this.playerImage.height // Taille du rectangle destination (c'est la taille du personnage)
    );
};

Player.prototype.actualizeTimeElapsed = function() {
    this.timeElapsed = this.timeElapsed + 1;

    document.getElementById('currentTimeElapsed' + this.id).innerHTML = this.timeElapsed;
};

Player.prototype.getNextPos = function(direction) {
    var coord = {'x' : this.x, 'y' : this.y};

    switch(direction) {
        case DIRECTION.DOWN :
            coord.y++;
            break;
        case DIRECTION.LEFT :
            coord.x--;
            break;
        case DIRECTION.RIGHT :
            coord.x++;
            break;
        case DIRECTION.UP :
            coord.y--;
            break;
    }

    return coord;
};

Player.prototype.movePlayer = function(direction, map, x, y) {
    if(this.etatAnimation >= 0)
    {
        return false;
    }

    this.direction = direction;

    this.etatAnimation = 1;

    if(x != null && y != null)
    {
        this.x = x;
        this.y = y;
    }
    else
    {
        var nextCase = this.getNextPos(direction);

        if(nextCase.x < 0 || nextCase.y < 0 || nextCase.x >= map.getWidth() || nextCase.y >= map.getHeight() || !this.isGoodBlock(map, direction))
        {
            return false;
        }

        this.x = nextCase.x;
        this.y = nextCase.y;
    }

    this.updateItem(map);

    return true;
};

Player.prototype.isGoodBlock = function(map, direction) {
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

Player.prototype.getBlock = function(map, block) {
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

Player.prototype.updateItem = function(map) {
    var xBlock = this.x % map.getWidth();
    var yBlock = this.y % map.getHeight();

    if(map.itemsLand[yBlock][xBlock] == 1)
    {
        setTimeout(function() { map.itemsLand[yBlock][xBlock] = 0; }, 500);

        this.updateCoins(1, true);
    }
    else if(map.itemsLand[yBlock][xBlock] == 2)
    {
        this.updateHealth(1, true);
    }
};

Player.prototype.updateHealth = function(lost, playMusic) {
    this.health = this.health - lost;

    document.getElementById('currentHealth' + this.id).value = this.health;

    if(playMusic) { health.play(); }
};

Player.prototype.updateCoins = function(count, playMusic) {
    this.coins = this.coins + count;

    document.getElementById('currentCoins' + this.id).innerHTML = this.coins;

    if(playMusic) { coins.play(); }
};

Player.prototype.isGameFinished = function(map) {
    return (this.coins == map.totalCoins || this.health <= 0);
}