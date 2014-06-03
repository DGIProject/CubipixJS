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
    this.land = tabMapData.land;
    this.listPlayers = [];
    this.imageBloc = new Image();
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
    //console.log('drawMap');

    for(var i = 0, l = this.land.length ; i < l ; i++)
    {
        var line = this.land[i];
        var y = i * 32;
        for(var j = 0, k = line.length ; j < k ; j++) {
            this.drawBloc(line[j], context, j * 32, y);
        }
    }

    //console.log(this.listPlayers.length);

    for(var x = 0; x < this.listPlayers.length; x++)
    {
        console.log('drawPlayerF');

        this.listPlayers[x].drawPlayer(context);
    }
};

Map.prototype.drawBloc = function(numberBloc, context, x, y) {
    //console.log('drawBloc');
    //console.log(x, y);

    if(numberBloc == 2)
    {
        this.imageBloc.src = 'img/texture/brick.png';
    }
    else
    {
        this.imageBloc.src = 'img/texture/dirt.png';
    }

    context.drawImage(this.imageBloc, x, y, 32, 32);
};