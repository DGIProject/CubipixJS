var canvas, context2d;
var blocsWidth, blocsHeight;

var currentBloc = {
    id : 0,
    type : 't',
    imageId : [0, 0, 0, 0],
    rotate : 0
};

var tabMapTexture = [];
var tabMapItem = [];
var tabMobs = [];

var playerPos = {
    "x" : 0,
    "y" : 0,
    "direction" : 0
};

var changePosMob = null;

var leftClick = false;

var map = {
    "mapUId" : null,
    "name" : "Map",
    "description" : "Description",
    "difficult" : null,
    "texture" : null,
    "alreadyEdited" : false
};

var loadTabImages = 0;
var tabTextureImages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 100, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209];
var tabItemImages = [1, 9, 10, 100];
var countLoadedImages = 0;
var totalImages = tabTextureImages.length + tabItemImages.length;

window.onload = function() {
    canvas = document.getElementById('canvas');
    context2d = canvas.getContext('2d');

    $('#loadMapEditorModal').modal('show');

    loadImages('t');
};

function loadImages(type)
{
    document.getElementById('progressLoadMapEditor').style.width = ((countLoadedImages / totalImages) * 100) + '%';

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
            $('#loadMapEditorModal').modal('hide');
            $('#startMapEditorModal').modal('show');
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

    document.getElementById('images').appendChild(image);
}

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
            widthTab.push([0, 0, [null, null]]);

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

    playerPos = tabMapData.playerSpawn;

    tabMapTexture = tabMapData.land;
    tabMapItem = tabMapData.itemsLand;

    var tabMobsT = tabMapData.mobs;

    blocsWidth = tabMapData.land[0].length;
    blocsHeight = tabMapData.land.length;

    canvas.width = blocsWidth * 32;
    canvas.height = blocsHeight * 32;

    drawMap(tabMapTexture, tabMapItem);

    document.getElementById('directionPlayer').options[playerPos.direction].selected = 'selected';

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
            context2d.drawImage(document.getElementById(blocs[line[j][0]].imageId[line[j][1]] + 't'), j * 32, y, 32, 32);
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

function addLineWidth()
{
    for(var i = 0; i < tabMapTexture.length; i++)
    {
        tabMapTexture[i].push(0);
    }

    canvas.width = canvas.width + 32;

    drawMap(tabMapTexture, tabMapItem);
}

function addLineHeight()
{
    var tabWidth = [];

    for(var x = 0; x < tabMapTexture[0].length; x++)
    {
        tabWidth.push(0);
    }

    tabMapTexture.push(tabWidth);

    canvas.height = canvas.height + 32;

    drawMap(tabMapTexture, tabMapItem);
}

document.getElementById('mapEditor').onmousedown = function(e) {
    if(e.button == 0)
    {
        if(changePosMob != null)
        {
            var x = Math.floor(((e.clientX + window.scrollX) - $('#canvas').offset().left) / 32);
            var y = Math.floor(((e.clientY + window.scrollY) - $('#canvas').offset().top) / 32);

            tabMobs[changePosMob][1] = x;
            tabMobs[changePosMob][2] = y;

            document.getElementById('posXMob' + changePosMob).value = x;
            document.getElementById('posYMob' + changePosMob).value = y;

            changePosMob = null;

            var n = noty({text: 'Position updated for the  mob.', layout: 'topRight', type: 'success'});
        }
        else
        {
            leftClick = true;

            drawBloc(e.clientX, e.clientY);
        }
    }
};

document.getElementById('mapEditor').onmouseup = function(e) {
    if(e.button == 0)
    {
        leftClick = false;
    }
};

document.getElementById('mapEditor').onmousemove = function(e) {
    if(changePosMob == null)
    {
        var x = Math.floor(((e.clientX + window.scrollX) - $('#canvas').offset().left) / 32);
        var y = Math.floor(((e.clientY + window.scrollY) - $('#canvas').offset().top) / 32);

        drawMap(tabMapTexture, tabMapItem);

        if(currentBloc.id == 0 && currentBloc.type == 'i')
        {
            console.log('noDraw');
        }
        else
        {
            context2d.drawImage(document.getElementById(currentBloc.imageId[currentBloc.rotate] + currentBloc.type), x * 32, y * 32, 32, 32);
        }
    }

    if(leftClick)
    {
        drawBloc(e.clientX, e.clientY);
    }
};

document.getElementById('mapEditor').oncontextmenu = function(e) {
    var x = Math.floor(((e.clientX + window.scrollX) - $('#canvas').offset().left) / 32);
    var y = Math.floor(((e.clientY + window.scrollY) - $('#canvas').offset().top) / 32);

    if(x >= 0 && y >= 0 && (x + 1) <= blocsWidth && (y + 1) <= blocsHeight)
    {
        //document.getElementById('dropdownOptionDiv').style.left = e.clientX + 'px';
        //document.getElementById('dropdownOptionDiv').style.top = e.clientY + 'px';

        //$('#dropdownOption').dropdown('toggle');

        if(currentBloc.type == 't')
        {
            currentBloc.rotate++;

            if(currentBloc.rotate > 3)
            {
                currentBloc.rotate = 0;
            }

            drawMap(tabMapTexture, tabMapItem);

            if(currentBloc.id == 0 && currentBloc.type == 'i')
            {
                console.log('noDraw');
            }
            else
            {
                context2d.drawImage(document.getElementById(currentBloc.imageId[currentBloc.rotate] + currentBloc.type), x * 32, y * 32, 32, 32);
            }
        }

        return false;
    }
};

function drawBloc(xMouse, yMouse)
{
    var x = Math.floor(((xMouse + window.scrollX) - $('#canvas').offset().left) / 32);
    var y = Math.floor(((yMouse + window.scrollY) - $('#canvas').offset().top) / 32);

    if(x >= 0 && y >= 0 && (x + 1) <= blocsWidth && (y + 1) <= blocsHeight)
    {
        if(currentBloc.id == 100 && currentBloc.type == 't')
        {
            var existSpawn = false;

            for(var i = 0; i < tabMapTexture.length; i++)
            {
                for(var j = 0; j < tabMapTexture[i].length; j++)
                {
                    if(tabMapTexture[i][j][0] == 100)
                    {
                        existSpawn = true;
                    }
                }
            }

            if(!existSpawn)
            {
                playerPos.x = x;
                playerPos.y = y;

                document.getElementById('posXPlayer').value = x;
                document.getElementById('posYPlayer').value = y;

                tabMapTexture[y][x] = [100, 0, [null, null]];

                context2d.drawImage(document.getElementById('100t'), x * 32, y * 32, 32, 32);
            }
            else
            {
                var n = noty({text: 'Spawn already exist.', layout: 'topRight', type: 'error'});
            }
        }
        else
        {
            if(currentBloc.type == 't')
            {
                tabMapTexture[y][x] = [currentBloc.id, currentBloc.rotate, [null, null]];
            }
            else if(currentBloc.type == 'i')
            {
                if(currentBloc.id == 0)
                {
                    tabMapItem[y][x] = [0, 0, [null, null]];

                    context2d.drawImage(document.getElementById(blocs[tabMapTexture[y][x][0]].imageId[tabMapTexture[y][x][1]] + 't'), x * 32, y * 32, 32, 32);

                    return false;
                }

                tabMapItem[y][x] = currentBloc.id;
            }
            else
            {
                console.log('error');
            }

            context2d.drawImage(document.getElementById(currentBloc.imageId[currentBloc.rotate] + currentBloc.type), x * 32, y * 32, 32, 32);

            if(tabMapItem[y][x] > 0)
            {
                context2d.drawImage(document.getElementById(tabMapItem[y][x] + 'i'), x * 32, y * 32, 32, 32);
            }
        }
    }
}

function setBloc(id, type, row)
{
    console.log((type == 't') ? blocs[id].imageId : items[id].imageId);

    currentBloc.id = id;
    currentBloc.type = type;
    currentBloc.imageId = ((type == 't') ? blocs[id].imageId : items[id].imageId);
    currentBloc.rotate = 0;

    removeTextureDisabled();
    removeItemDisabled();

    document.getElementById('liButton' + row + type).classList.add('active');
}

function removeTextureDisabled()
{
    for(var i = 0; i < 13; i++)
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

function setDirectionPlayer(value)
{
    playerPos.direction = value;
}

function addMob(type, direction, x, y)
{
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
        '<div class="form-group"><label class="col-sm-2 control-label">X</label><div class="col-sm-4"><input type="text" id="posXMob' + mobId + '" name="posXMob' + mobId + '" class="form-control" value="' + x + '" disabled=""></div></div>' +
        '<div class="form-group"><label class="col-sm-2 control-label">Y</label><div class="col-sm-4"><input type="text" id="posYMob' + mobId + '" name="posYMob' + mobId + '" class="form-control" value="' + y + '" disabled=""></div></div>' +
        '<div class="form-group"><div class="col-sm-offset-2 col-sm-4"><button type="button" onclick="updatePosMob(' + mobId + ');" class="btn btn-default">Change position of the mob</button></div></div>' +
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

function updatePosMob(id)
{
    changePosMob = id;

    var n = noty({text: 'Click on the map to change the position of the mob.', layout: 'topRight', type: 'info'});

    $('#mobsModal').modal('hide');
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
            if(tabMapTexture[i][x] == 100)
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

$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
    // Avoid following the href location when clicking
    event.preventDefault();
    // Avoid having the menu to close when clicking
    event.stopPropagation();
    // If a menu is already open we close it
    //$('ul.dropdown-menu [data-toggle=dropdown]').parent().removeClass('open');
    // opening the one you clicked on
    $(this).parent().addClass('open');

    var menu = $(this).parent().find("ul");
    var menupos = menu.offset();

    if ((menupos.left + menu.width()) + 30 > $(window).width()) {
        var newpos = - menu.width();
    } else {
        var newpos = $(this).parent().width();
    }
    menu.css({ left:newpos });

});