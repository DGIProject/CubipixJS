var canvas, context2d;
var mapUId, map;
var playerId = 0;
var countdown;
var tabKeys = [];

var gameTimer, multiplayerTimer, playersTimer;

var usernameUId = null;
var serverUId = null;

var ownerServer = false;

var configControlsKey = [[90, 81, 68, 83], [38, 37, 39, 40], [84, 70, 72, 71], [73, 74, 76, 75]];

var editKeyControlInfo = {
    playerId : 0,
    direction : 0,
    isEditing : false
};

var loadTabImages = 0;
var tabTextureImages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 100, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209];
var tabItemImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100];
var countLoadedImages = 0;
var totalImages = tabTextureImages.length + tabItemImages.length;

function loadImages(type)
{
    document.getElementById('progressLoadMap').style.width = ((countLoadedImages / totalImages) * 100) + '%';

    if(type == 't')
    {
        if(loadTabImages == tabTextureImages.length)
        {
            loadTabImages = 0;

            loadImages('i');
        }
        else
        {
            downloadImage(tabTextureImages[loadTabImages], type);
        }
    }
    else
    {
        if(loadTabImages == tabItemImages.length)
        {
            $('#loadMapModal').modal('hide');
            $('#startGameModal').modal('show');

            map.drawMap(context2d);
        }
        else
        {
            downloadImage(tabItemImages[loadTabImages], type);
        }
    }
}

function downloadImage(id, type)
{
    var image = document.createElement('img');
    image.id = id + type;
    image.src = 'view/img/' + ((type == 't') ? 'texture' : 'item') + '/' + id + '.png';

    image.onload = function() {
        countLoadedImages++;
        loadTabImages++;

        loadImages(type);
    };

    image.onerror = function() {
      alert('Error');
    };

    document.getElementById('images').appendChild(image);
}

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

window.onbeforeunload = function() {
    console.log('close window');

    return 'You are playing, all data will lost.';
};

window.onunload = function() {
    console.log('unload');

    stopGame();
};

function addPlayer(online, usernameUIdN)
{
    console.log('addPlayer');

    if(playerId < 4)
    {
        var divPlayer = document.createElement('div');
        divPlayer.id = 'playerStart' + playerId;
        divPlayer.setAttribute('class', 'panel panel-default');
        divPlayer.innerHTML = '<div class="panel-heading">' +
            '<h3 class="panel-title">Player ' + (playerId + 1) + '</h3>' +
            '</div>';

        if(online)
        {
            divPlayer.innerHTML += '<div class="panel-body">Online player.</div>';
        }
        else
        {
            divPlayer.innerHTML += '<div class="panel-body">' +
                '<form class="form-horizontal">' +
                '<div class="form-group"><label class="col-sm-2 control-label">USERNAME</label><div class="col-sm-4"><input type="text" id="username' + playerId + '" onkeyup="updateUsername(' + playerId + ', this.value);" class="form-control" value="' + ((playerId == 0) ? '(You)' : ('Player ' + (playerId + 1))) + '" ' + ((playerId == 0) ? 'disabled=""' : '') + '></div></div>' +
                '<h4>Controls</h4>' +
                '<div class="form-group"><label class="col-sm-2 control-label">UP</label><div class="col-sm-4"><div class="input-group"><input type="text" id="upControl' + playerId + '" class="form-control" disabled=""><span class="input-group-btn"><button type="button" id="buttonUpControl' + playerId + '" onclick="editKeyControl(' + playerId + ', 0);" class="btn btn-default"><span class="glyphicon glyphicon-edit"></span></button></span></div></div></div>' +
                '<div class="form-group"><label class="col-sm-2 control-label">LEFT</label><div class="col-sm-4"><div class="input-group"><input type="text" id="leftControl' + playerId + '" class="form-control" disabled=""><span class="input-group-btn"><button type="button" id="buttonLeftControl' + playerId + '" onclick="editKeyControl(' + playerId + ', 1);" class="btn btn-default"><span class="glyphicon glyphicon-edit"></span></button></span></div></div></div>' +
                '<div class="form-group"><label class="col-sm-2 control-label">RIGHT</label><div class="col-sm-4"><div class="input-group"><input type="text" id="rightControl' + playerId + '" class="form-control" disabled=""><span class="input-group-btn"><button type="button" id="buttonRightControl' + playerId + '" onclick="editKeyControl(' + playerId + ', 2);" class="btn btn-default"><span class="glyphicon glyphicon-edit"></span></button></span></div></div></div>' +
                '<div class="form-group"><label class="col-sm-2 control-label">DOWN</label><div class="col-sm-4"><div class="input-group"><input type="text" id="downControl' + playerId + '" class="form-control" disabled=""><span class="input-group-btn"><button type="button" id="buttonDownControl' + playerId + '" onclick="editKeyControl(' + playerId + ', 3);" class="btn btn-default"><span class="glyphicon glyphicon-edit"></span></button></span></div></div></div>' +
                '</form>' +
                '</div>';
        }

        document.getElementById('playersStart').appendChild(divPlayer);

        document.getElementById('mapTotalPlayers').innerHTML = (playerId + 1).toString();

        var spanPlayer = document.createElement('span');
        spanPlayer.id = 'playerGame' + playerId;
        spanPlayer.innerHTML = '<span class="marginInformations"><span id="playerName' + playerId + '">Player ' + (playerId + 1) + '</span></span>' +
            '<span class="marginInformations">Coins : <span id="currentCoins' + playerId + '">0</span> / <span id="totalCoins' + playerId + '">0</span></span>' +
            '<span class="marginInformations"><progress id="currentHealth' + playerId + '" class="progressHealth" value="0" max="10"></progress></span>' +
            '<span class="marginInformations"><span id="currentTimeElapsed' + playerId + '">0</span>s</span>';

        document.getElementById('players').appendChild(spanPlayer);

        document.getElementById('totalCoins' + playerId).innerHTML = map.totalCoins;

        var player = new Player(playerId, ((playerId == 0) ? '(You)' : ('Player ' + playerId)), 'player.png', map.playerSpawn.x, map.playerSpawn.y, map.playerSpawn.direction, online);

        if(online)
        {
            player.usernameUId = usernameUIdN;
        }
        else
        {
            if(playerId == 0)
            {
                player.usernameUId = usernameUId;
            }
            else
            {
                player.usernameUId = getUId();
            }

            player.keyControls.UP = configControlsKey[playerId][0];
            player.keyControls.LEFT = configControlsKey[playerId][1];
            player.keyControls.RIGHT = configControlsKey[playerId][2];
            player.keyControls.DOWN = configControlsKey[playerId][3];

            document.getElementById('upControl' + playerId).value = nameKey(configControlsKey[playerId][0]);
            document.getElementById('leftControl' + playerId).value = nameKey(configControlsKey[playerId][1]);
            document.getElementById('rightControl' + playerId).value = nameKey(configControlsKey[playerId][2]);
            document.getElementById('downControl' + playerId).value = nameKey(configControlsKey[playerId][3]);
        }

        map.addPlayer(player);

        playerId++;
    }
    else
    {
        console.log('enoughPlayer');

        var n = noty({text: 'There is enough players.', layout: 'topRight', type: 'info'});
    }
}

function updateUsername(playerId, value)
{
    map.listPlayers[playerId].username = value;

    document.getElementById('playerName' + playerId).innerHTML = value;
}

function editKeyControl(playerId, direction)
{
    if(!editKeyControlInfo.isEditing)
    {
        editKeyControlInfo.playerId = playerId;
        editKeyControlInfo.direction = direction;
        editKeyControlInfo.isEditing = true;

        var buttonId = 'button';

        switch (direction) {
            case 0 :
                buttonId += 'UpControl';
                break;
            case 1 :
                buttonId += 'LeftControl';
                break;
            case 2 :
                buttonId += 'RightControl';
                break;
            default :
                buttonId += 'DownControl';
        }

        buttonId += playerId;

        setCancelControlKeyButton(buttonId, playerId, direction);
    }
    else
    {
        var n = noty({text: 'A key is already editing.', layout: 'topRight', type: 'warning'});
    }
}

function stopEditKeyControl(playerId, direction)
{
    editKeyControlInfo.isEditing = false;

    var buttonId = 'button';

    switch (direction) {
        case 0 :
            buttonId += 'UpControl';
            break;
        case 1 :
            buttonId += 'LeftControl';
            break;
        case 2 :
            buttonId += 'RightControl';
            break;
        default :
            buttonId += 'DownControl';
    }

    buttonId += playerId;

    setEditControlKeyButton(buttonId, playerId, direction);
}

function updateControls(keyCode)
{
    if(keyCode == 27)
    {
        stopEditKeyControl(editKeyControlInfo.playerId, editKeyControlInfo.direction);
    }
    else
    {
        if(isGoodKey(keyCode))
        {
            var playerId = editKeyControlInfo.playerId;
            var direction = editKeyControlInfo.direction;

            if(!alreadyTakenKey(keyCode))
            {
                switch (direction) {
                    case 0 :
                        map.listPlayers[playerId].keyControls.UP = parseInt(keyCode);

                        document.getElementById('upControl' + playerId).value = nameKey(keyCode);
                        break;
                    case 1 :
                        map.listPlayers[playerId].keyControls.LEFT = parseInt(keyCode);

                        document.getElementById('leftControl' + playerId).value = nameKey(keyCode);
                        break;
                    case 2 :
                        map.listPlayers[playerId].keyControls.RIGHT = parseInt(keyCode);

                        document.getElementById('rightControl' + playerId).value = nameKey(keyCode);
                        break;
                    case 3 :
                        map.listPlayers[playerId].keyControls.DOWN = parseInt(keyCode);

                        document.getElementById('downControl' + playerId).value = nameKey(keyCode);
                        break;
                    default :
                        console.log('error');

                        var n = noty({text: 'Error, there is no direction.', layout: 'topRight', type: 'error'});
                }

                stopEditKeyControl(playerId, direction);
            }
            else
            {
                var n = noty({text: 'This key is already taken.', layout: 'topRight', type: 'warning'});
            }
        }
        else
        {
            var n = noty({text: 'This key is not a good key.', layout: 'topRight', type: 'warning'});
        }
    }
}

function alreadyTakenKey(keyCode)
{
    var alreadyTaken = false;

    for(var i = 0; i < map.listPlayers.length; i++)
    {
        switch(keyCode)
        {
            case map.listPlayers[i].keyControls.UP :
                alreadyTaken = true;
                break;
            case map.listPlayers[i].keyControls.LEFT :
                alreadyTaken = true;
                break;
            case map.listPlayers[i].keyControls.RIGHT :
                alreadyTaken = true;
                break;
            case map.listPlayers[i].keyControls.DOWN :
                alreadyTaken = true;
                break;
        }
    }

    return alreadyTaken;
}

function isGoodKey(keyCode)
{
    return (keyCode >= 65 && keyCode <= 90) || (keyCode >= 37 && keyCode <= 40);
}

function nameKey(keyCode)
{
    if(keyCode >= 37 && keyCode <= 40)
    {
        switch (keyCode) {
            case 37 :
                return 'Key left';
            case 38 :
                return 'Key up';
            case 39 :
                return 'Key right';
            default :
                return 'Key down';
        }
    }
    else
    {
        return String.fromCharCode(keyCode);
    }
}

function setEditControlKeyButton(buttonId, playerId, direction)
{
    document.getElementById(buttonId).innerHTML = '<span class="glyphicon glyphicon-edit"></span>';

    document.getElementById(buttonId).setAttribute('onclick', 'editKeyControl(' + playerId + ', ' + direction + ');');

    document.getElementById(buttonId).classList.remove('btn-danger');
    document.getElementById(buttonId).classList.add('btn-default');
}

function setCancelControlKeyButton(buttonId, playerId, direction)
{
    document.getElementById(buttonId).innerHTML = '<span class="glyphicon glyphicon-remove"></span>';

    document.getElementById(buttonId).setAttribute('onclick', 'stopEditKeyControl(' + playerId + ', ' + direction + ');');

    document.getElementById(buttonId).classList.remove('btn-default');
    document.getElementById(buttonId).classList.add('btn-danger');
}

document.getElementById('bodyGame').onkeydown = function(e)
{
    console.log('bodyGame');

    if(editKeyControlInfo.isEditing)
    {
        updateControls(e.keyCode);
    }
};

function setValues(uUId, sUId, ownerUId)
{
    usernameUId = uUId;
    serverUId = (sUId != '') ? sUId : null;

    if(ownerUId == uUId)
    {
        ownerServer = true;
    }
}

function loadMap(mUId, name)
{
    mapUId = mUId;
    map = new Map(mUId, name);

    document.getElementById('currentMap').innerHTML = name;

    canvas.width = map.getWidth() * 32;
    canvas.height = map.getHeight() * 32;

    addPlayer(false);

    if(serverUId)
    {
        multiplayerTimer = setInterval(function() {
            var samePos;

            for(var i = 0; i < map.listPlayers.length; i++)
            {
                if(!map.listPlayers[i].online)
                {
                    //console.log(map.listPlayers[i].x, map.listPlayers[i].lastX);
                    //console.log(map.listPlayers[i].y, map.listPlayers[i].lastY);

                    samePos = 0;

                    if(map.listPlayers[i].x == map.listPlayers[i].lastX && map.listPlayers[i].y == map.listPlayers[i].lastY)
                    {
                        samePos = 1;
                    }

                    //var direction = null;

                    //if(map.listPlayers[i].direction != map.listPlayers[i].lastDirection)
                    //{
                    //direction = map.listPlayers[i].direction;
                    //}

                    map.listPlayers[i].lastX = map.listPlayers[i].x;
                    map.listPlayers[i].lastY = map.listPlayers[i].y;
                    //map.listPlayers[i].lastDirection = map.listPlayers[i].direction;

                    //console.log('direction : ' + map.listPlayers[i].direction);

                    sendQueryServer(map.listPlayers[i].usernameUId, map.listPlayers[i].x, map.listPlayers[i].y, map.listPlayers[i].direction, samePos, null);
                }
            }
        }, 200);
    }

    setTimeout(function() {
        document.getElementById('buttonAddPlayer').removeAttribute('disabled');
    }, 500);

    setTimeout(function() {
        document.getElementById('loadMap').innerHTML = '<button type="button" onclick="startGameB();" class="btn btn-success btn-block">' + ((serverUId != null) ? 'Waiting for owner ...' : 'Start') + '</button><button type="button" onclick="location.href = \'index.php?type=game\';" class="btn btn-default btn-block">Exit</button>';
    }, 1000);
}

function startGameB()
{
    if(serverUId != null && ownerServer)
    {
        sendQueryServer(usernameUId, null, null, null, 0, 'startGame');
    }
    else
    {
        var i = 3;

        countdown = setInterval(function() { showCountDown(i);i--; }, 1000);

        music01.play();

        $('#startGameModal').modal('hide');
    }
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
            tabKeys.splice(index, 1);
        }
    };

    gameTimer = setInterval(function() {
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

    playersTimer = setInterval(function() {
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

            stopGame();

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

function stopGame()
{
    console.log('stopGame');

    clearInterval(gameTimer);
    clearInterval(playersTimer);

    if(serverUId)
    {
        clearInterval(multiplayerTimer);

        for(var i = 0; i < map.listPlayers.length; i++)
        {
            sendQueryServer(map.listPlayers[i].usernameUId, null, null, null, false, 'leftUser');
        }
    }
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
    OAjax.send('mUId=' + mapUId + '&points=' + points);
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
    OAjax.send('mUId=' + mapUId + '&win=' + win + '&points=' + totalPoints + '&health=' + player1.health + '&timeG=' + player1.timeElapsed);
}

function sendQueryServer(uUId, x, y, direction, samePos, server)
{
    //console.log('sUId=' + serverUId + '&uUId=' + uUId + '&posX=' + x + '&posY=' + y + '&direction=' + direction + '&samePos=' + samePos + '&server=' + server);
    var OAjax;

    if (window.XMLHttpRequest) OAjax = new XMLHttpRequest();
    else if (window.ActiveXObject) OAjax = new ActiveXObject('Microsoft.XMLHTTP');
    OAjax.open('POST', 'server/index.php',true);
    OAjax.onreadystatechange = function()
    {
        if (OAjax.readyState == 4 && OAjax.status==200)
        {
            //console.log(OAjax.responseText);

            document.getElementById('logMultiplayer').innerHTML = 'sUId=' + serverUId + '&uUId=' + uUId + '&posX=' + x + '&posY=' + y + '&direction=' + direction + '&samePos=' + samePos + '&server=' + server + ' ' + OAjax.responseText;

            var tabAnswerServer = JSON.parse(OAjax.responseText);

            var answer = tabAnswerServer[0];

            if(answer == 'true')
            {
                var tabPlayers = tabAnswerServer[1];

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
                                if(tabPlayers[i][4] == 0)
                                {
                                    map.listPlayers[playerRow].movePlayer(tabPlayers[i][3], map, tabPlayers[i][1], tabPlayers[i][2]);
                                }
                                else
                                {
                                    console.log('samePos');
                                }

                                //map.listPlayers[playerRow].x = tabPlayers[i][1];
                                //map.listPlayers[playerRow].y = tabPlayers[i][2];
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
            else if(answer == 'startGame')
            {
                console.log('startGame');

                startGameB();
            }
            else if(answer == 'leftUser')
            {
                console.log('leftUser');
            }
            else
            {
                console.log('errorServer');
            }
        }
    };

    OAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    OAjax.send('sUId=' + serverUId + '&uUId=' + uUId + '&posX=' + x + '&posY=' + y + '&direction=' + direction + '&samePos=' + samePos + '&server=' + server);
}

function s4()
{
    return Math.floor((1 + Math.random()) * 0x10000) . toString(16) . substring(1);
}

function getUId()
{
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function getXMLHttpRequest()
{
    var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject)
    {
        if (window.ActiveXObject)
        {
            try
            {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(e)
            {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        else
        {
            xhr = new XMLHttpRequest();
        }
    }
    else
    {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }

    return xhr;
}