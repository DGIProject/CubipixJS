var canvas, context2d;
var blocsWidth, blocsHeight;

var currentBloc = {
    id : 0,
    type : 't',
    canRotate : false,
    rowTRotate : 0,
    tRotate : []
};

var tabMapTexture = [];
var tabMapItem = [];
var tabMobs = [];

var playerPos = {
    "x" : 0,
    "y" : 0,
    "direction" : 0
};

var leftClick = false;

var map = {
    "mapUId" : null,
    "name" : "Map",
    "description" : "Description",
    "difficult" : null,
    "texture" : null,
    "alreadyEdited" : false
};

window.onload = function() {
    canvas = document.getElementById('canvas');
    context2d = canvas.getContext('2d');

    $('#startMapEditorModal').modal('show');
};

function startMapEditor(widthMapBloc, heightMapBloc)
{
    map.mapUId = getUId();
    map.alreadyEdited = false;

    blocsWidth = widthMapBloc;
    blocsHeight = heightMapBloc;

    canvas.width = blocsWidth * 32;
    canvas.height = blocsHeight * 32;

    for(var i = 0; i < blocsHeight; i++)
    {
        var widthTab = [];

        for(var x = 0; x < blocsWidth; x++)
        {
            widthTab.push(0);

            context2d.drawImage(document.getElementById('0t'), x * 32, i * 32, 32, 32);
        }

        tabMapTexture.push(widthTab);
    }

    for(var a = 0; a < blocsHeight; a++)
    {
        var widthTabs = [];

        for(var b = 0; b < blocsWidth; b++)
        {
            widthTabs.push(0);
        }

        tabMapItem.push(widthTabs);
    }

    $('#startMapEditorModal').modal('hide');
}

function loadMap(mUId)
{
    console.log('loadMap');

    map.mapUId = mUId;
    map.alreadyEdited = true;

    getInfoMap(mUId);

    var xhr = getXMLHttpRequest();

    xhr.open("GET", 'maps/' + mUId + '.cm', false);
    xhr.send(null);
    if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
        throw new Error("Impossible de charger la carte nommée \"" + mUId + "\" (code HTTP : " + xhr.status + ").");
    var mapJsonData = xhr.responseText;

    var tabMapData = JSON.parse(mapJsonData);

    tabMapTexture = tabMapData.land;
    tabMapItem = tabMapData.itemsLand;

    var tabMobsT = tabMapData.mobs;

    blocsWidth = tabMapData.land[0].length;
    blocsHeight = tabMapData.land.length;

    canvas.width = blocsWidth * 32;
    canvas.height = blocsHeight * 32;

    drawMap(tabMapTexture, tabMapItem);

    for(var z = 0; z < tabMobsT.length; z++)
    {
        addMob(tabMobsT[z][0], tabMobsT[z][3], tabMobsT[z][1], tabMobsT[z][2]);
    }

    $('#startMapEditorModal').modal('hide');
}

function s4()
{
    return Math.floor((1 + Math.random()) * 0x10000) . toString(16) . substring(1);
}

function getUId()
{
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function drawMap(tabMapTexture, tabMapItem)
{
    for(var i = 0, l = tabMapTexture.length; i < l; i++)
    {
        var line = tabMapTexture[i];
        var y = i * 32;

        for(var j = 0, k = line.length; j < k; j++)
        {
            context2d.drawImage(document.getElementById(line[j] + 't'), j * 32, y, 32, 32);
        }
    }

    for(var a = 0, b = tabMapItem.length; a < b; a++)
    {
        var lineItem = tabMapItem[a];
        var c = a * 32;

        for(var d = 0, e = lineItem.length; d < e; d++)
        {
            if(lineItem[d] != 0)
            {
                context2d.drawImage(document.getElementById(lineItem[d] + 'i'), d * 32, c, 32, 32);
            }
        }
    }
}

document.getElementById('mapEditor').onmousedown = function(e) {
    console.log(e.button);

    if(e.button == 0)
    {
        leftClick = true;

        drawBloc(e.clientX, e.clientY);
    }
};

document.getElementById('mapEditor').onmouseup = function(e) {
    if(e.button == 0)
    {
        leftClick = false;
    }
};

document.getElementById('mapEditor').onmousemove = function(e) {
    var x = Math.floor(((e.clientX + window.scrollX) - $('#canvas').offset().left) / 32);
    var y = Math.floor(((e.clientY + window.scrollY) - $('#canvas').offset().top) / 32);

    drawMap(tabMapTexture, tabMapItem);

    if(currentBloc.id == 0 && currentBloc.type == 'i')
    {
        console.log('noDraw');
    }
    else
    {
        context2d.drawImage(document.getElementById(currentBloc.id + currentBloc.type), x * 32, y * 32, 32, 32);
    }

    if(leftClick)
    {
        drawBloc(e.clientX, e.clientY);
    }
};

document.getElementById('mapEditor').oncontextmenu = function(e) {
    console.log('contextMenu');

    var x = Math.floor(((e.clientX + window.scrollX) - $('#canvas').offset().left) / 32);
    var y = Math.floor(((e.clientY + window.scrollY) - $('#canvas').offset().top) / 32);

    if(x >= 0 && y >= 0 && (x + 1) <= blocsWidth && (y + 1) <= blocsHeight)
    {
        //document.getElementById('dropdownOptionDiv').style.left = e.clientX + 'px';
        //document.getElementById('dropdownOptionDiv').style.top = e.clientY + 'px';

        //$('#dropdownOption').dropdown('toggle');

        if(currentBloc.canRotate)
        {
            currentBloc.rowTRotate = ((currentBloc.rowTRotate + 1) == currentBloc.tRotate.length) ? 0 : currentBloc.rowTRotate + 1;
            currentBloc.id = currentBloc.tRotate[currentBloc.rowTRotate];

            drawMap(tabMapTexture, tabMapItem);

            if(currentBloc.id == 0 && currentBloc.type == 'i')
            {
                console.log('noDraw');
            }
            else
            {
                context2d.drawImage(document.getElementById(currentBloc.id + currentBloc.type), x * 32, y * 32, 32, 32);
            }
        }

        return false;
    }
};

function drawBloc(xMouse, yMouse)
{
    var x = Math.floor(((xMouse + window.scrollX) - $('#canvas').offset().left) / 32);
    var y = Math.floor(((yMouse + window.scrollY) - $('#canvas').offset().top) / 32);

    console.log(x, document.body.scrollTop);

    if(x >= 0 && y >= 0 && (x + 1) <= blocsWidth && (y + 1) <= blocsHeight)
    {
        if(currentBloc.id == 15 && currentBloc.type == 't')
        {
            var existSpawn = false;

            for(var i = 0; i < tabMapTexture.length; i++)
            {
                for(var j = 0; j < tabMapTexture[i].length; j++)
                {
                    if(tabMapTexture[i][j] == 15)
                    {
                        console.log('existSpawn');

                        existSpawn = true;
                    }
                }
            }

            if(!existSpawn)
            {
                playerPos.x = x;
                playerPos.y = y;

                tabMapTexture[y][x] = 15;

                context2d.drawImage(document.getElementById('15t'), x * 32, y * 32, 32, 32);
            }
            else
            {
                console.log('alreadySpawn');

                var n = noty({text: 'Spawn already exist.', layout: 'topRight', type: 'error'});
            }
        }
        else
        {
            if(currentBloc.type == 't')
            {
                tabMapTexture[y][x] = currentBloc.id;
            }
            else if(currentBloc.type == 'i')
            {
                if(currentBloc.id == 0)
                {
                    tabMapItem[y][x] = 0;

                    context2d.drawImage(document.getElementById(tabMapTexture[y][x] + 't'), x * 32, y * 32, 32, 32);

                    return false;
                }

                tabMapItem[y][x] = currentBloc.id;
            }
            else
            {
                console.log('error');
            }

            context2d.drawImage(document.getElementById(currentBloc.id + currentBloc.type), x * 32, y * 32, 32, 32);

            if(tabMapItem[y][x] > 0)
            {
                context2d.drawImage(document.getElementById(tabMapItem[y][x] + 'i'), x * 32, y * 32, 32, 32);
            }
        }
    }
    else
    {
        console.log('out');
    }
}

function setBloc(id, type, canRotate, tRotate)
{
    currentBloc.id = id;
    currentBloc.type = type;
    currentBloc.canRotate = canRotate;
    currentBloc.rowTRotate = 0;
    currentBloc.tRotate = tRotate;

    removeTextureDisabled();
    removeItemDisabled();

    document.getElementById('liButton' + id + type).classList.add('active');
}

function removeTextureDisabled()
{
    for(var i = 0; i < 16; i++)
    {
        document.getElementById('liButton' + i + 't').classList.remove('active');
    }
}

function removeItemDisabled()
{
    for(var i = 0; i < 3; i++)
    {
        document.getElementById('liButton' + i + 'i').classList.remove('active');
    }
}

function setNameMap(value)
{
    map.name = value;
}

function setDescriptionMap(value)
{
    map.description = value;
}

function setDifficultMap(value)
{
    map.difficult = value;
}

function setTextureMap(value)
{
    map.texture = value;
}

function addMob(type, direction, x, y)
{
    console.log(type, direction, x, y);

    var mob = [type, x, y, direction];
    var mobId = tabMobs.length;

    tabMobs.push(mob);

    var mobE = document.createElement('a');
    mobE.id = 'mob' + mobId;
    mobE.classList.add('list-group-item');
    mobE.innerHTML = '<span class="pull-right"><button type="button" onclick="deleteMob(' + mobId + ');" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span></button></span>' +
        '<h4 class="list-group-item-heading">Mob</h4>' +
        '<p class="list-group-item-text">' +
        '<form class="form-horizontal">' +
        '<div class="form-group"><label class="col-sm-2 control-label">Type</label><div class="col-sm-4"><select id="typeMob' + mobId + '" name="typeMob' + mobId + '" onchange="setTypeMob(' + mobId + ', this.value);" class="form-control"><option value="0">Nice</option><option value="1">Bad</option><option value="2">Naughty</option></select></div></div>' +
        '<div class="form-group"><label class="col-sm-2 control-label">Direction</label><div class="col-sm-4"><select id="directionMob' + mobId + '" name="directionMob' + mobId + '" onchange="setDirectionMob(' + mobId + ', this.value);" class="form-control"><option value="0">UP - DOWN</option><option value="1">LEFT - RIGHT</option><option value="2">RIGHT - LEFT</option><option value="3">DOWN - UP</option></select></div></div>' +
        '<div class="form-group"><label class="col-sm-2 control-label">X</label><div class="col-sm-4"><input type="text" id="posXMob' + mobId + '" name="posXMob' + mobId + '" onkeyup="setPosXMob(' + mobId + ', this.value);" class="form-control" value="' + x + '"></div></div>' +
        '<div class="form-group"><label class="col-sm-2 control-label">Y</label><div class="col-sm-4"><input type="text" id="posYMob' + mobId + '" name="posYMob' + mobId + '" onkeyup="setPosYMob(' + mobId + ', this.value);" class="form-control" value="' + y + '"></div></div>' +
        '</form>' +
        '</p>';

    document.getElementById('mobs').appendChild(mobE);

    document.getElementById('typeMob' + mobId).options[type].selected = 'selected';
    document.getElementById('directionMob' + mobId).options[direction].selected = 'selected';
}

function deleteMob(id)
{
    tabMobs[id] = null;

    document.getElementById('mobs').removeChild(document.getElementById('mob' + id));
}

function setTypeMob(id, value)
{
    tabMobs[id][0] = parseInt(value);
}

function setDirectionMob(id, value)
{
    tabMobs[id][3] = parseInt(value);
}

function setPosXMob(id, value)
{
    tabMobs[id][1] = parseInt(value);
}

function setPosYMob(id, value)
{
    tabMobs[id][2] = parseInt(value);
}

function getTotalCoins()
{
    var totalCoins = 0;

    for(var i = 0; i < tabMapItem.length; i++)
    {
        for(var x = 0; x < tabMapItem[i].length; x++)
        {
            if(tabMapItem[i][x] == 1)
            {
                totalCoins++;
            }
        }
    }

    return totalCoins;
}

function existSpawn()
{
    var existSpawn = false;

    for(var i = 0; i < tabMapTexture.length; i++)
    {
        for(var x = 0; x < tabMapTexture[i].length; x++)
        {
            if(tabMapTexture[i][x] == 15)
            {
                existSpawn = true;
            }
        }
    }

    return existSpawn;
}

function saveMap()
{
    if(getTotalCoins() > 0)
    {
        if(existSpawn())
        {
            document.getElementById('buttonSaveMap').setAttribute('disabled', '');

            var json = '{ "name" : "' + map.name + '", "playerSpawn" : {"x" : ' + playerPos.x + ', "y" : ' + playerPos.y + ', "direction" : ' + playerPos.direction + '}, "land" : ' + JSON.stringify(tabMapTexture) + ', "itemsLand" : ' + JSON.stringify(tabMapItem) + ', "mobs" : ' + JSON.stringify(tabMobs) + ' }';

            var OAjax;

            if (window.XMLHttpRequest) OAjax = new XMLHttpRequest();
            else if (window.ActiveXObject) OAjax = new ActiveXObject('Microsoft.XMLHTTP');
            OAjax.open('POST', 'index.php?type=mapEditor&a=generateFileMap',true);
            OAjax.onreadystatechange = function()
            {
                if (OAjax.readyState == 4 && OAjax.status == 200)
                {
                    console.log(OAjax.responseText);

                    if(OAjax.responseText == 'true')
                    {
                        map.alreadyEdited = true;

                        var n = noty({text: 'The map is saved.', layout: 'topRight', type: 'success'});
                    }
                    else
                    {
                        console.log('error');

                        var n = noty({text: 'Error, unable to save the map.', layout: 'topRight', type: 'error'});
                    }

                    document.getElementById('buttonSaveMap').removeAttribute('disabled');
                }
            }

            OAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            OAjax.send('mUId=' + map.mapUId + '&name=' + map.name + '&description=' + encodeURIComponent(map.description) + '&difficult=' + map.difficult + '&alreadyEdited=' + ((map.alreadyEdited) ? 1 : 0) + '&json=' + encodeURIComponent(json));
        }
        else
        {
            var n = noty({text: 'There is no spawn.', layout: 'topRight', type: 'error'});
        }
    }
    else
    {
        var n = noty({text: 'There is no coins.', layout: 'topRight', type: 'error'});
    }
}

function getInfoMap(mUId)
{
    var OAjax;

    if (window.XMLHttpRequest) OAjax = new XMLHttpRequest();
    else if (window.ActiveXObject) OAjax = new ActiveXObject('Microsoft.XMLHTTP');
    OAjax.open('POST', 'index.php?type=mapEditor&a=getInfoMap',true);
    OAjax.onreadystatechange = function()
    {
        if (OAjax.readyState == 4 && OAjax.status == 200)
        {
            console.log(OAjax.responseText);

            var tabInfoMap = JSON.parse(OAjax.responseText);

            setNameMap(tabInfoMap[0]);
            setDescriptionMap(tabInfoMap[1]);
            setDifficultMap(tabInfoMap[2]);
            setTextureMap(tabInfoMap[3]);

            document.getElementById('mapName').value = tabInfoMap[0];
            document.getElementById('mapDescription').value = tabInfoMap[1];
            document.getElementById('mapDifficult').options[tabInfoMap[2]].selected = 'selected';
        }
    }

    OAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    OAjax.send('mUId=' + mUId);
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