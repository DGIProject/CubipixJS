function Map(name)
{
    var xhr = getXMLHttpRequest();

    // Chargement du fichier
    xhr.open("GET", 'maps/' + name + '.cm', false);
    xhr.send(null);
    if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
        throw new Error("Impossible de charger la carte nommée \"" + name + "\" (code HTTP : " + xhr.status + ").");
    var mapJsonData = xhr.responseText;

    var tabMapData = JSON.parse(mapJsonData);

    console.log(tabMapData.name);

    this.name = name;
    this.playerSpawn = tabMapData.playerSpawn;
    this.land = tabMapData.land;
    this.itemsLand = tabMapData.itemsLand;
    this.totalCoins = tabMapData.totalCoins;
    this.listPlayers = [];
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