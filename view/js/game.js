var canvas, context2d;
var mapId, map;
var playerId = 0;
var countdown;
var tabKeys = [];

var usernameUId = null;
var serverUId = null;

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

function addPlayer(online, usernameUIdN)
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

        var player = new Player(playerId, 'user2', 'player.png', map.playerSpawn.x, map.playerSpawn.y, map.playerSpawn.direction, online);

        if(online)
        {
            player.usernameUId = usernameUIdN;
        }
        else
        {
            if(playerId == 0)
            {
                player.usernameUId = usernameUId;

                player.keyControls.UP = 90;
                player.keyControls.LEFT = 81;
                player.keyControls.RIGHT = 68;
                player.keyControls.DOWN = 83;
            }
            else
            {
                player.usernameUId = getUId();
            }
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

function setValues(uUId, sUId)
{
    usernameUId = uUId;
    serverUId = (sUId != '') ? sUId : null;
}

function loadMap(id, name)
{
    mapId = parseInt(id);

    map = new Map(name);

    document.getElementById('currentMap').innerHTML = name;

    canvas.width = map.getWidth() * 32;
    canvas.height = map.getHeight() * 32;

    addPlayer(false);

    setTimeout(function() {
        document.getElementById('buttonAddPlayer').removeAttribute('disabled');
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

        if(code == 27)
        {
            $('#menuGameModal').modal('toggle');
        }
        else
        {
            if(tabKeys.indexOf(code) < 0)
            {
                tabKeys.push(code);
            }
        }
    };

    document.onkeyup = function(e) {
        var code = e.keyCode;
        var index = tabKeys.indexOf(code);

        if(index >= 0)
        {
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
                    default :
                        console.log('notGameKey');
                }
            }
        }
    }, 40);

    if(serverUId)
    {
        setInterval(function() {
            for(var i = 0; i < map.listPlayers.length; i++)
            {
                if(!map.listPlayers[i].online)
                {
                    sendQueryServer(map.listPlayers[i].usernameUId, map.listPlayers[i].x, map.listPlayers[i].y);
                }
            }
        }, 500);
    }

    var timerPlayers = setInterval(function() {
        if(stillAlive() && !haveTotalCoins())
        {
            for(var i = 0; i < map.listPlayers.length; i++)
            {
                if(!map.listPlayers[i].isGameFinished(map))
                {
                    map.listPlayers[i].actualizeTimeElapsed();
                }
            }
        }
        else
        {
            console.log('gameFinished');

            clearInterval(timerPlayers);

            if(stillAlive())
            {
                document.getElementById('titleFG').innerHTML = 'You win the map';
            }
            else
            {
                document.getElementById('titleFG').innerHTML = 'You lost the map';
            }

            for(var x = 0; x < map.listPlayers.length; x++)
            {
                var divPlayer = document.createElement('div');
                divPlayer.classList.add('well');
                divPlayer.innerHTML = '<div class="well">' +
                    '<span>Player : ' + map.listPlayers[x].username + '</span></br>' +
                    '<span>Time elapsed : ' + map.listPlayers[x].timeElapsed + 's.</span></br>' +
                    '<span>Coins : ' + map.listPlayers[x].coins + ' / ' + map.totalCoins + '.</span></br>' +
                    '<span>Points : .</span></br>' +
                    '<span>Ranking : <span id="currentRankingFG"><img src="view/img/ajax-loader.gif"></span>.</span>' +
                    '</div>';

                document.getElementById('playersFinish').appendChild(divPlayer);
            }

            $('#finishGameModal').modal('show');
        }
    }, 1000);
}

function haveTotalCoins()
{
    var totalCoins = 0;

    for(var i = 0; i < map.listPlayers.length; i++)
    {
        totalCoins += parseInt(map.listPlayers[i].coins);
    }

    return totalCoins == map.totalCoins;
}

function stillAlive()
{
    var stillAlive = false;

    for(var i = 0; i < map.listPlayers.length; i++)
    {
        if(map.listPlayers[i].health >= 0)
        {
            stillAlive = true;
        }
    }

    return stillAlive;
}

function getTotalPoints(id, win)
{
    var pointsTime = (60/100) * ((40 / map.listPlayers[id].timeElapsed) * 2);
    var pointsHealth = (50/100) * (((map.listPlayers[id].health / 10) * 20) * 2);

    var totalPoints = Math.ceil((win == 1) ? ((110/100) * (pointsTime + pointsHealth)) : ((20/100) * (pointsTime + pointsHealth))) * 2;
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

function sendQueryServer(uUId, x, y)
{
    var OAjax;

    if (window.XMLHttpRequest) OAjax = new XMLHttpRequest();
    else if (window.ActiveXObject) OAjax = new ActiveXObject('Microsoft.XMLHTTP');
    OAjax.open('POST', 'server/index.php',true);
    OAjax.onreadystatechange = function()
    {
        if (OAjax.readyState == 4 && OAjax.status==200)
        {
            //console.log(OAjax.responseText);

            var tabPlayers = JSON.parse(OAjax.responseText);

            //console.log(tabPlayers);

            for(var i = 0; i < tabPlayers.length; i++)
            {
                var playerExist = false;
                var playerRow = null;

                for(var x = 0; x < map.listPlayers.length; x++)
                {
                    if(tabPlayers[i][0] == map.listPlayers[x].usernameUId)
                    {
                        playerExist = true;
                        playerRow = x;
                    }
                }

                if(playerExist)
                {
                    //console.log('playerExist');

                    if(map.listPlayers[playerRow].online)
                    {
                        //console.log('online');

                        if(tabPlayers[i][1] != '' && tabPlayers[i][1] != null && tabPlayers[i][2] != '' && tabPlayers[i][2] != null)
                        {
                            map.listPlayers[playerRow].x = tabPlayers[i][1];
                            map.listPlayers[playerRow].y = tabPlayers[i][2];
                        }
                        else
                        {
                            //console.log('notGoodPos');
                        }
                    }
                    else
                    {
                        //console.log('notOnline');
                    }
                }
                else
                {
                    addPlayer(true, tabPlayers[i][0]);
                }
            }
        }
    };

    OAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    OAjax.send('sUid=' + serverUId + '&uUid=' + uUId + '&posX=' + x + '&posY=' + y);
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function getUId()
{
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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