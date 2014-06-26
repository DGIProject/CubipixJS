function Item(id, itemId, x, y)
{
    this.id = id;
    this.itemId = itemId;
    this.imageId = items[itemId].imageId;
    this.name = items[itemId].name;
    this.image = document.getElementById(items[itemId].imageId + 'i');

    this.x = x;
    this.y = y;

    this.isAnimation = items[itemId].isAnimation;

    if(this.isAnimation)
    {
        this.images = items[itemId].images;
    }
}

Item.prototype.startAnimation = function(map) {
    if(this.isAnimation)
    {

    }
};