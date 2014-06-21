var canvas, context2d;
var blocsWidth, blocsHeight;
var currentBloc = 0;
var currentType = 't';

var tabMapTexture = [];
var tabMapItem = [];
var tabMobs = [];

var totalCoins = 0;
var playerPos = {
    "x" : 0,
    "y" : 0
};

var map = {
    "mapUId" : null,
    "name" : "Map",
    "description" : "Description",
    "difficult" : 0,
    "texture" : 0,
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

    var xhr = getXMLHttpRequest();

    xhr.open("GET", 'maps/' + mUId + '.cm', false);
    xhr.send(null);
    if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
        throw new Error("Impossible de charger la carte nommée \"" + mUId + "\" (code HTTP : " + xhr.status + ").");
    var mapJsonData = xhr.responseText;

    var tabMapData = JSON.parse(mapJsonData);

    tabMapTexture = tabMapData.land;
    tabMapItem = tabMapData.itemsLand;

    blocsWidth = tabMapData.land[0].length;
    blocsHeight = tabMapData.land.length;

    canvas.width = blocsWidth * 32;
    canvas.height = blocsHeight * 32;

    for(var i = 0, l = tabMapData.land.length; i < l; i++)
    {
        var line = tabMapData.land[i];
        var y = i * 32;

        for(var j = 0, k = line.length; j < k; j++)
        {
            context2d.drawImage(document.getElementById(line[j] + 't'), j * 32, y, 32, 32);
        }
    }

    for(var a = 0, b = tabMapData.itemsLand.length; a < b; a++)
    {
        var lineItem = tabMapData.itemsLand[a];
        var c = a * 32;

        for(var d = 0, e = lineItem.length; d < e; d++)
        {
            if(lineItem[d] != 0)
            {
                context2d.drawImage(document.getElementById(lineItem[d] + 'i'), d * 32, c, 32, 32);
            }
        }
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

window.onclick = function(e) {
    var x = Math.floor((e.clientX - $('#canvas').offset().left) / 32);
    var y = Math.floor((e.clientY - ($('#canvas').offset().top)) / 32);

    console.log(e.clientX, e.clientY);
    console.log(x, y);
    console.log(currentType);
    console.log($('#canvas').offset().left, $('#canvas').offset().top);

    if(x >= 0 && y >= 0 && (x + 1) <= blocsWidth && (y + 1) <= blocsHeight)
    {
        if(currentType == 't')
        {
            tabMapTexture[y][x] = currentBloc;

            if(tabMapItem[y][x] == 1)
            {
                totalCoins--;
            }

            tabMapItem[y][x] = 0;
        }
        else if(currentType == 'i')
        {
            if(currentBloc == 1)
            {
                totalCoins++;
            }

            tabMapItem[y][x] = currentBloc;
        }
        else
        {
            console.log('error');
        }

        context2d.drawImage(document.getElementById(currentBloc + currentType), x * 32, y * 32, 32, 32);
    }
    else
    {
        console.log('out');
    }
};

function setBloc(id, type)
{
    currentBloc = id;
    currentType = type;

    removeTextureDisabled();
    removeItemDisabled();

    document.getElementById('button' + id + type).classList.add('disabled');
}

function removeTextureDisabled()
{
    for(var i = 0; i < 14; i++)
    {
        document.getElementById('button' + i + 't').classList.remove('disabled');
    }
}

function removeItemDisabled()
{
    for(var i = 1; i < 3; i++)
    {
        document.getElementById('button' + i + 'i').classList.remove('disabled');
    }
}

function setPosXPlayer(x)
{
    playerPos.x = parseInt(x);
}

function setPosYPlayer(y)
{
    playerPos.y = parseInt(y);
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

function addMob()
{
    var mob = [0, 0, 0, 0];
    var mobId = tabMobs.length;

    tabMobs.push(mob);

    var mobE = document.createElement('a');
    mobE.id = 'mob' + mobId;
    mobE.classList.add('list-group-item');
    mobE.innerHTML = '<span class="pull-right"><button type="button" onclick="deleteMob(' + mobId + ');" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span></button></span>' +
        '<h4 class="list-group-item-heading">Mob</h4>' +
        '<p class="list-group-item-text">' +
        '<form class="form-horizontal">' +
        '<div class="form-group"><label class="col-sm-2 control-label">Type</label><div class="col-sm-4"><select onchange="setTypeMob(' + mobId + ', this.value);" class="form-control"><option value="0">Nice</option><option value="1">Bad</option><option value="2">Naughty</option></select></div></div>' +
        '<div class="form-group"><label class="col-sm-2 control-label">Direction</label><div class="col-sm-4"><select onchange="setDirectionMob(' + mobId + ', this.value);" class="form-control"><option value="0">UP - DOWN</option><option value="1">LEFT - RIGHT</option><option value="2">RIGHT - LEFT</option><option value="3">DOWN - UP</option></select></div></div>' +
        '<div class="form-group"><label class="col-sm-2 control-label">X</label><div class="col-sm-4"><input type="text" onkeyup="setPosXMob(' + mobId + ', this.value);" class="form-control" value="0"></div></div>' +
        '<div class="form-group"><label class="col-sm-2 control-label">Y</label><div class="col-sm-4"><input type="text" onkeyup="setPosYMob(' + mobId + ', this.value);" class="form-control" value="0"></div></div>' +
        '</form>' +
        '</p>';

    document.getElementById('mobs').appendChild(mobE);
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

function saveMap()
{
    var json = '{ "name" : "' + map.name + '", "playerSpawn" : {"x" : ' + playerPos.x + ', "y" : ' + playerPos.y + '}, "land" : ' + JSON.stringify(tabMapTexture) + ', "itemsLand" : ' + JSON.stringify(tabMapItem) + ', "totalCoins" : ' + totalCoins + ', "mobs" : ' + JSON.stringify(tabMobs) + ' }';

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
            }
            else
            {
                console.log('error');
            }
        }
    }

    OAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    OAjax.send('mapUId=' + map.mapUId + '&name=' + map.name + '&description=' + encodeURIComponent(map.description) + '&difficult=' + map.difficult + '&alreadyEdited=' + ((map.alreadyEdited) ? 1 : 0) + '&json=' + encodeURIComponent(json));
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