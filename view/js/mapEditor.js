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

window.onload = function() {
    canvas = document.getElementById('canvas');
    context2d = canvas.getContext('2d');

    $('#startMapEditorModal').modal('show');
};

function startMapEditor(widthMapBloc, heightMapBloc)
{
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

window.onclick = function(e) {
    var x = Math.floor((e.clientX - $('#canvas').offset().left) / 32);
    var y = Math.floor((e.clientY - 51) / 32);

    console.log(x, y);
    console.log(currentType);

    if((x + 1) <= blocsWidth && (y + 1) <= blocsHeight)
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
    for(var i = 0; i < 1; i++)
    {
        document.getElementById('button' + i + 'i').classList.remove('disabled');
    }
}

function setPosXPlayer(x)
{
    playerPos.x = x;
}

function setPosYPlayer(y)
{
    playerPos.y = y;
}

function addMob()
{
    var mob = [0, 0, 0, 0];

    tabMobs.push(mob);

    var mobE = document.createElement('a');
    mobE.classList.add('list-group-item');
    mobE.innerHTML = '<span class="pull-right"><button type="button" onclick="deleteMob();" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span></button></span><h4 class="list-group-item-heading">Mob</h4><p class="list-group-item-text"><form class="form-horizontal"><div class="form-group"><label class="col-sm-2 control-label">X</label><div class="col-sm-10"><input type="text" onkeyup="setPosXPlayer(this.value);" class="form-control" value="0"></div></div><div class="form-group"><label class="col-sm-2 control-label">Y</label><div class="col-sm-10"><input type="text" onkeyup="setPosYPlayer(this.value);" class="form-control" value="0"></div></div></form></p>';

    document.getElementById('mobs').appendChild(mobE);
}

function saveMap(name, description, difficult)
{
    var json = '{ "name" : "' + name + '", "playerSpawn" : {"x" : ' + playerPos.x + ', "y" : ' + playerPos.y + '}, "land" : ' + JSON.stringify(tabMapTexture) + ', "itemsLand" : ' + JSON.stringify(tabMapItem) + ', "totalCoins" : ' + totalCoins + ', "mobs" : ' + JSON.stringify(tabMobs) + ' }';

    var OAjax;

    if (window.XMLHttpRequest) OAjax = new XMLHttpRequest();
    else if (window.ActiveXObject) OAjax = new ActiveXObject('Microsoft.XMLHTTP');
    OAjax.open('POST', 'index.php?type=mapEditor&a=generateFileMap',true);
    OAjax.onreadystatechange = function()
    {
        if (OAjax.readyState == 4 && OAjax.status==200)
        {
            console.log(OAjax.responseText);
        }
    }

    OAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    OAjax.send('name=' + name + '&description=' + encodeURIComponent(description) + '&difficult=' + difficult + '&json=' + encodeURIComponent(json));
}