var canvas, context2d;

window.onload = function()
{
    console.log('loaded');

    canvas = document.getElementById('canvas');
    context2d = canvas.getContext('2d');

    $('#startGameModal').modal('show');
}

function startGame(name)
{
    $('#startGameModal').modal('hide');

    var map = new Map(name);

    document.getElementById('currentMap').innerHTML = name;
    document.getElementById('totalCoins').innerHTML = map.totalCoins;

    canvas.width = map.getWidth() * 32;
    canvas.height = map.getHeight() * 32;

    console.log(map.playerSpawn.x);

    var player = new Player('player.png', map.playerSpawn.x, map.playerSpawn.y, DIRECTION.DOWN);
    //player.getAroundBlock(map);

    map.addPlayer(player);

    setInterval(function() {
        map.drawMap(context2d);
    }, 40);

    window.onkeydown = function(event) {
        var e = event || window.event;
        var key = e.which || e.keyCode;

        switch(key) {
            case 38 : case 122 : case 119 : case 90 : case 87 :
            player.movePlayer(DIRECTION.UP, map);
            break;
            case 40 : case 115 : case 83 :
            player.movePlayer(DIRECTION.DOWN, map);
            break;
            case 37 : case 113 : case 97 : case 81 : case 65 :
            player.movePlayer(DIRECTION.LEFT, map);
            break;
            case 39 : case 100 : case 68 :
            player.movePlayer(DIRECTION.RIGHT, map);
            break;
            default :
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