function Map(mUId, name)
{
    var xhr = getXMLHttpRequest();

    xhr.open("GET", 'maps/' + mUId + '.cm', false);
    xhr.send(null);
    if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
        throw new Error("Impossible de charger la carte nommée \"" + mUId + "\" (code HTTP : " + xhr.status + ").");
    var mapJsonData = xhr.responseText;

    var tabMapData = JSON.parse(mapJsonData);

    console.log(tabMapData.name);

    this.mapUId = mUId;
    this.name = name;
    this.playerSpawn = tabMapData.playerSpawn;
    this.land = tabMapData.land;
    this.itemsLand = tabMapData.itemsLand;
    this.totalCoins = tabMapData.totalCoins;
    this.mobs = tabMapData.mobs;
    this.listPlayers = [];
    this.listMobs = [];

    for(var i = 0; i < this.mobs.length; i++)
    {
        this.listMobs.push(new Mob(i, this.mobs[i][0], this.mobs[i][1], this.mobs[i][2], this.mobs[i][3]));
    }
}

Map.prototype.getName = function () {
    return this.name;
};

Map.prototype.getListPlayers = function () {
    return this.listPlayers;
};

Map.prototype.getWidth = function() {
    return this.land[0].length;
};

Map.prototype.getHeight = function() {
    return this.land.length;
};

Map.prototype.addPlayer = function(player) {
    this.listPlayers.push(player);
}

Map.prototype.detectCollisionMob = function(x, y) {
    for(var i = 0; i < this.listPlayers.length; i++)
    {
        if(x == this.listPlayers[i].x && y == this.listPlayers[i].y)
        {
            console.log('collision');

            this.listPlayers[i].updateHealth(1, true);
        }
    }
}

Map.prototype.drawMap = function(context) {
    for(var i = 0, l = this.land.length; i < l; i++)
    {
        var line = this.land[i];
        var y = i * 32;

        for(var j = 0, k = line.length; j < k; j++)
        {
            this.drawBloc(line[j], context, j * 32, y);
        }
    }

    for(var a = 0, b = this.itemsLand.length; a < b; a++)
    {
        var lineItem = this.itemsLand[a];
        var c = a * 32;

        for(var d = 0, e = lineItem.length; d < e; d++)
        {
            if(lineItem[d] != 0)
            {
                this.drawItem(lineItem[d], context, d * 32, c);
            }
        }
    }

    for(var z = 0; z < this.listMobs.length; z++)
    {
        this.listMobs[z].drawMob(context);
        this.listMobs[z].moveMob(this);
    }

    for(var x = 0; x < this.listPlayers.length; x++)
    {
        this.listPlayers[x].drawPlayer(context);
    }
};

Map.prototype.drawBloc = function(numberBloc, context, x, y) {
    context.drawImage(document.getElementById(numberBloc + 't'), x, y, 32, 32);
};

Map.prototype.drawItem = function(numberItem, context, x, y) {
    context.drawImage(document.getElementById(numberItem + 'i'), x, y, 32, 32);
};