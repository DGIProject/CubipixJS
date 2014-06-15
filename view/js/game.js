var canvas, context2d;
var map;
var player1, player2;
var playerId = 0;
var countdown;

var controlsPlayer1 = {
    'UP' : 90,
    'DOWN' : 83,
    'LEFT' : 81,
    'RIGHT' : 68
};

soundManager.url = 'view/music/';
soundManager.debugMode = true;

var music01, health;

soundManager.onload = function() {
    music01 = soundManager.createSound(
        {
            id : "music01",
            url : "view/music/music01.mp3",
            volume : 10,
            onfinish : function() {
                this.play();
            }
        });

    health = soundManager.createSound(
        {
            id : "health",
            url : "view/music/sounds/health.mp3"
        });
}

function loadMap(name)
{
    map = new Map(name);

    document.getElementById('currentMap').innerHTML = name;

    canvas.width = map.getWidth() * 32;
    canvas.height = map.getHeight() * 32;

    player1 = new Player(playerId, 'user2', 'player.png', map.playerSpawn.x, map.playerSpawn.y, DIRECTION.DOWN);

    document.getElementById('totalCoins' + playerId).innerHTML = map.totalCoins;

    setTimeout(function() {
        map.addPlayer(player1);
        map.drawMap(context2d);
    }, 500);

    setTimeout(function() {
        document.getElementById('loadMap').innerHTML = '<button type="button" onclick="startGameB();" class="btn btn-success btn-block">Start</button>';
    }, 1000);
}

function startGameB()
{
    var i = 3;

    countdown = setInterval(function() { showCountDown(i);i--; }, 1000);

    music01.play();

    $('#startGameModal').modal('hide');
}

function showCountDown(i)
{
    console.log(i);

    document.getElementById('countdown').innerHTML = i;

    if(i <= 0)
    {
        clearInterval(countdown);

        document.getElementById('countdown').innerHTML = 'Let\'s go';

        startGame();
    }
}

function startGame()
{
    setInterval(function() {
        map.drawMap(context2d);
    }, 40);

    var timerPlayer1 = setInterval(function() {
        player1.actualizeTimeElapsed();

        if(player1.isGameFinished(map))
        {
            console.log('gameFinished');

            clearInterval(timerPlayer1);
        }
    }, 1000);

    window.onkeydown = function(event) {
        var e = event || window.event;
        var key = e.which || e.keyCode;

        switch(key) {
            case controlsPlayer1.UP :
                player1.movePlayer(DIRECTION.UP, map);
                break;
            case controlsPlayer1.DOWN :
                player1.movePlayer(DIRECTION.DOWN, map);
                break;
            case controlsPlayer1.LEFT :
                player1.movePlayer(DIRECTION.LEFT, map);
                break;
            case controlsPlayer1.RIGHT :
                player1.movePlayer(DIRECTION.RIGHT, map);
                break;
            case 27 :
                $('#menuGameModal').modal('toggle');
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