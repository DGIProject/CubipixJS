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
    //this.land = tabMapData.land;
    this.land = this.generateBlocs(tabMapData.land);
    //this.itemsLand = tabMapData.itemsLand;
    this.itemsLand = this.generateItems(tabMapData.itemsLand);
    this.totalCoins = this.getTotalCoins(tabMapData.itemsLand);
    this.mobs = tabMapData.mobs;
    this.listPlayers = [];
    this.listMobs = [];

    for(var i = 0; i < this.mobs.length; i++)
    {
        this.listMobs.push(new Mob(i, this.mobs[i][0], this.mobs[i][1], this.mobs[i][2], this.mobs[i][3]));
    }
}

Map.prototype.generateBlocs = function(land)
{
    var tabLand = [];
    var id = 0;

    for(var i = 0; i < land.length; i++)
    {
        var tabWidth = [];

        for(var x = 0; x < land[i].length; x++)
        {
            tabWidth.push(new Bloc(id, land[i][x][0], x, i, land[i][x][1][0], land[i][x][1][1]));

            id++;
        }

        tabLand.push(tabWidth);
    }

    return tabLand;
};

Map.prototype.generateItems = function(itemsLand)
{
    var tabItemsLand = [];
    var id = 0;

    for(var i = 0; i < itemsLand.length; i++)
    {
        var tabWidth = [];

        for(var x = 0; x < itemsLand[i].length; x++)
        {
            if(itemsLand[i][x] != 0)
            {
                tabWidth.push(new Item(id, itemsLand[i][x], x, i));
            }
            else
            {
                tabWidth.push(0);
            }

            id++;
        }

        tabItemsLand.push(tabWidth);
    }

    return tabItemsLand;
};

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

Map.prototype.getTotalCoins = function(itemsLand) {
    var totalCoins = 0;

    for(var i = 0; i < itemsLand.length; i++)
    {
        for(var x = 0; x < itemsLand[i].length; x++)
        {
            if(itemsLand[i][x] == 1)
            {
                totalCoins++;
            }
        }
    }

    return totalCoins;
}

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
            this.drawBloc(line[j].imageId, context, j * 32, y);
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
                this.drawItem(lineItem[d].imageId, context, d * 32, c);
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