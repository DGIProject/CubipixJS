var canvas, context2d;
var mapId, map;
var player1, player2;
var playerId = 0;
var countdown;

var controlsPlayer1 = {
    'UP' : 90,
    'LEFT' : 81,
    'RIGHT' : 68,
    'DOWN' : 83
};

soundManager.url = 'view/music/';
soundManager.debugMode = true;

var music01, health;

soundManager.onload = function() {
    music01 = soundManager.createSound(
        {
            id : "music01",
            url : "view/music/music01.mp3",
            volume : 20,
            onfinish : function() {
                this.play();
            }
        });

    health = soundManager.createSound(
        {
            id : "health",
            url : "view/music/sounds/health.mp3",
            volume : 10
        });

    coins = soundManager.createSound(
        {
            id : "coins",
            url : "view/music/sounds/coins.mp3",
            volume : 20
        });
};

function updateVolume(value, type)
{
    if(type == 'music')
    {
        music01.setVolume(value);
    }
    else if(type == 'sound')
    {
        health.setVolume(value);
        coins.setVolume(value);
    }
    else
    {
        console.log('error');
    }
}

function updateControls(direction, value)
{
    switch (direction) {
        case 0 :
            controlsPlayer1.UP = parseInt(value);
            break;
        case 1 :
            controlsPlayer1.LEFT = parseInt(value);
            break;
        case 2 :
            controlsPlayer1.RIGHT = parseInt(value);
            break;
        case 3 :
            controlsPlayer1.DOWN = parseInt(value);
            break;
        default :
            console.log('error');
    }
}

function loadMap(id, name)
{
    mapId = parseInt(id);

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

            if(player1.coins == map.totalCoins)
            {
                addScore(1);

                document.getElementById('titleFG').innerHTML = 'You win the map';
            }
            else
            {
                addScore(0);

                document.getElementById('titleFG').innerHTML = 'You lose the map';
            }

            document.getElementById('timeElapsedFG').innerHTML = player1.timeElapsed;

            document.getElementById('currentCoinsFG').innerHTML = player1.coins;
            document.getElementById('totalCoinsFG').innerHTML = map.totalCoins;

            $('#finishGameModal').modal('show');
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

function getRanking(points)
{
    var OAjax;

    if (window.XMLHttpRequest) OAjax = new XMLHttpRequest();
    else if (window.ActiveXObject) OAjax = new ActiveXObject('Microsoft.XMLHTTP');
    OAjax.open('POST', 'index.php?type=game&a=getRanking',true);
    OAjax.onreadystatechange = function()
    {
        if (OAjax.readyState == 4 && OAjax.status==200)
        {
            console.log(OAjax.responseText);

            document.getElementById('currentRankingFG').innerHTML = OAjax.responseText;
        }
    }

    OAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    OAjax.send('mapId=' + mapId + '&points=' + points);
}

function addScore(win)
{
    var pointsTime = (60/100) * ((40 / player1.timeElapsed) * 2);
    var pointsHealth = (50/100) * (((player1.health / 10) * 20) * 2);

    var totalPoints = Math.ceil((win == 1) ? ((110/100) * (pointsTime + pointsHealth)) : ((20/100) * (pointsTime + pointsHealth))) * 2;

    document.getElementById('currentPointsFG').innerHTML = totalPoints;

    var OAjax;

    if (window.XMLHttpRequest) OAjax = new XMLHttpRequest();
    else if (window.ActiveXObject) OAjax = new ActiveXObject('Microsoft.XMLHTTP');
    OAjax.open('POST', 'index.php?type=game&a=addScore',true);
    OAjax.onreadystatechange = function()
    {
        if (OAjax.readyState == 4 && OAjax.status==200)
        {
            console.log(OAjax.responseText);

            if(OAjax.responseText == 'true')
            {
                getRanking(totalPoints);
            }
            else
            {
                console.log('error');
            }
        }
    }

    OAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    OAjax.send('mapId=' + mapId + '&win=' + win + '&points=' + totalPoints + '&health=' + player1.health + '&timeG=' + player1.timeElapsed);
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