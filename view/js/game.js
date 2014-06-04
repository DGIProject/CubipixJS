var canvas, context2d;
var map;
var player1, player2;
var playerId = 0;
var countdown;

window.onload = function()
{
    console.log('loaded');

    canvas = document.getElementById('canvas');
    context2d = canvas.getContext('2d');

    $('#startGameModal').modal('show');
}

function loadMap(name)
{
    document.getElementById('loadMap').innerHTML = '<img src="view/img/ajax-loader.gif">';

    map = new Map(name);

    document.getElementById('currentMap').innerHTML = name;
    document.getElementById('totalCoins').innerHTML = map.totalCoins;

    canvas.width = map.getWidth() * 32;
    canvas.height = map.getHeight() * 32;

    player1 = new Player(playerId, 'user2', 'player.png', map.playerSpawn.x, map.playerSpawn.y, DIRECTION.DOWN);

    map.addPlayer(player1);
    map.drawMap(context2d);

    document.getElementById('loadMap').innerHTML = '<button type="button" onclick="startGameB();" class="btn btn-success btn-block">Start</button>';
}

function startGameB()
{
    var i = 3;

    countdown = setInterval(function() { showCountDown(i);i--; }, 1000);

    $('#startGameModal').modal('hide');
}

function showCountDown(i)
{
    console.log(i);

    if(i <= 0)
    {
        clearInterval(countdown);

        startGame();
    }
}

function startGame()
{
    setInterval(function() {
        map.drawMap(context2d);
    }, 40);

    window.onkeydown = function(event) {
        var e = event || window.event;
        var key = e.which || e.keyCode;

        switch(key) {
            case 38 : case 122 : case 119 : case 90 : case 87 :
            player1.movePlayer(DIRECTION.UP, map);
            break;
            case 40 : case 115 : case 83 :
            player1.movePlayer(DIRECTION.DOWN, map);
            break;
            case 37 : case 113 : case 97 : case 81 : case 65 :
            player1.movePlayer(DIRECTION.LEFT, map);
            break;
            case 39 : case 100 : case 68 :
            player1.movePlayer(DIRECTION.RIGHT, map);
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