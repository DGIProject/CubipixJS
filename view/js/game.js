var canvas, context2d;
var mapId, map;
var player1, player2;
var playerId = 0;
var countdown;
var tabKeys = [];

var controlsPlayer1 = {
    'UP' : 90,
    'LEFT' : 81,
    'RIGHT' : 68,
    'DOWN' : 83
};

soundManager.url = 'view/music/';
soundManager.debugMode = false;

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

function addPlayer()
{
    console.log('addPlayer');

    if(playerId < 4)
    {
        var divPlayer = document.createElement('div');
        divPlayer.setAttribute('class', 'panel panel-default');
        divPlayer.innerHTML = '<div class="panel-heading">' +
            '<h3 class="panel-title">Player ' + (playerId + 1) + '</h3>' +
            '</div>' +
            '<div class="panel-body">' +
            '<h4>Controls</h4>' +
            '<form class="form-horizontal">' +
            '<div class="form-group"><label class="col-sm-2 control-label">UP</label><div class="col-sm-10"><select id="upControl" onchange="updateControls(' + playerId + ', 0, this.value);" class="form-control"><option value="90">Z</option><option value="38">Key up</option></select></div></div>' +
            '<div class="form-group"><label class="col-sm-2 control-label">LEFT</label><div class="col-sm-10"><select id="leftControl" onchange="updateControls(' + playerId + ', 1, this.value);" class="form-control"><option value="81">Q</option><option value="37">Key left</option></select></div></div>' +
            '<div class="form-group"><label class="col-sm-2 control-label">RIGHT</label><div class="col-sm-10"><select id="rightControl" onchange="updateControls(' + playerId + ', 2, this.value);" class="form-control"><option value="68">D</option><option value="39">Key right</option></select></div></div>' +
            '<div class="form-group"><label class="col-sm-2 control-label">DOWN</label><div class="col-sm-10"><select id="downControl" onchange="updateControls(' + playerId + ', 3, this.value);" class="form-control"><option value="83">S</option><option value="40">Key down</option></select></div></div>' +
            '</form>' +
            '</div>';

        document.getElementById('playersStart').appendChild(divPlayer);

        var spanPlayer = document.createElement('span');
        spanPlayer.innerHTML = '<span class="marginInformations">Player : <span id="playerName' + playerId + '">player' + (playerId + 1) + '</span></span>' +
            '<span class="marginInformations">Coins : <span id="currentCoins' + playerId + '">0</span> / <span id="totalCoins' + playerId + '">0</span></span>' +
            '<span class="marginInformations">Health : <progress id="currentHealth' + playerId + '" class="progressHealth" value="0" max="10"></progress></span>' +
            '<span class="marginInformations">Time elapsed : <span id="currentTimeElapsed' + playerId + '">0</span>s</span>';

        document.getElementById('players').appendChild(spanPlayer);

        document.getElementById('totalCoins' + playerId).innerHTML = map.totalCoins;

        var player = new Player(playerId, 'user2', 'player.png', map.playerSpawn.x, map.playerSpawn.y, map.playerSpawn.direction);

        if(playerId == 0)
        {
            player.keyControls.UP = 90;
            player.keyControls.LEFT = 81;
            player.keyControls.RIGHT = 68;
            player.keyControls.DOWN = 83;
        }

        map.addPlayer(player);

        playerId++;
    }
    else
    {
        console.log('enoughPlayer');
    }
}

function updateControls(playerId, direction, value)
{
    switch (direction) {
        case 0 :
            map.listPlayers[playerId].keyControls.UP = parseInt(value);
            break;
        case 1 :
            map.listPlayers[playerId].keyControls.LEFT = parseInt(value);
            break;
        case 2 :
            map.listPlayers[playerId].keyControls.RIGHT = parseInt(value);
            break;
        case 3 :
            map.listPlayers[playerId].keyControls.DOWN = parseInt(value);
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

    setTimeout(function() {
        document.getElementById('buttonAddPlayer').removeAttribute('disabled');
        addPlayer();
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
    document.onkeydown = function(e) {
        var code = e.keyCode;
        if(tabKeys.indexOf(code)<0) {
            tabKeys.push(code);
        }
    };

    document.onkeyup = function(e) {
        var code = e.keyCode,
            index = tabKeys.indexOf(code);
        if(index>=0) {
            tabKeys.splice(index,1);
        }
    };
    setInterval(function() {
        map.drawMap(context2d);

        for(var i = 0; i < tabKeys.length; i++)
        {
            for(var x = 0; x < map.listPlayers.length; x++)
            {
                switch(tabKeys[i]) {
                    case map.listPlayers[x].keyControls.UP :
                        map.listPlayers[x].movePlayer(DIRECTION.UP, map);
                        break;
                    case map.listPlayers[x].keyControls.DOWN :
                        map.listPlayers[x].movePlayer(DIRECTION.DOWN, map);
                        break;
                    case map.listPlayers[x].keyControls.LEFT :
                        map.listPlayers[x].movePlayer(DIRECTION.LEFT, map);
                        break;
                    case map.listPlayers[x].keyControls.RIGHT :
                        map.listPlayers[x].movePlayer(DIRECTION.RIGHT, map);
                        break;
                    case 27 :
                        $('#menuGameModal').modal('toggle');
                        break;
                    default :
                        console.log('error');
                }
            }
        }
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

    /*
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
                player2.movePlayer(DIRECTION.UP, map);
                //$('#menuGameModal').modal('toggle');
                break;
            default :
                return true;
        }

        return false;
    }
    */
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