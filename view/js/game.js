var canvas, context2d;

window.onload = function()
{
    console.log('loaded');

    canvas = document.getElementById('canvas');
    context2d = canvas.getContext('2d');

    $('#startGameModal').modal('show');
}

function startGame()
{
    var map = new Map('map01');

    canvas.width = map.getWidth() * 32;
    canvas.height = map.getHeight() * 32;

    //var player = new Player('player.png', 7, 14, DIRECTION.BAS);

    //map.addPlayer(player);

    map.drawMap(context2d);

    // Gestion du clavier
    window.onkeydown = function(event) {
        // On récupère le code de la touche
        var e = event || window.event;
        var key = e.which || e.keyCode;

        switch(key) {
            case 38 : case 122 : case 119 : case 90 : case 87 : // Flèche haut, z, w, Z, W
            player.deplacer(DIRECTION.HAUT, map);
            break;
            case 40 : case 115 : case 83 : // Flèche bas, s, S
            player.deplacer(DIRECTION.BAS, map);
            break;
            case 37 : case 113 : case 97 : case 81 : case 65 : // Flèche gauche, q, a, Q, A
            player.deplacer(DIRECTION.GAUCHE, map);
            break;
            case 39 : case 100 : case 68 : // Flèche droite, d, D
            player.deplacer(DIRECTION.DROITE, map);
            break;
            default :
                //alert(key);
                // Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
                return true;
        }

        return false;
    }
}

function getXMLHttpRequest() {
    var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest();
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }

    return xhr;
}