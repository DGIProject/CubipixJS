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

Item.prototype.startAnimation = function() {
    if(this.isAnimation)
    {
        this.intervalAnimation = setInterval(function(classItem) {
            var countImage = classItem.images.length;
            var rowNextImage = classItem.images.indexOf(classItem.imageId) + 1;

            if(rowNextImage == countImage)
            {
                rowNextImage = 0;
            }

            classItem.imageId = classItem.images[rowNextImage];
        }, 200, this);
    }
};

Item.prototype.stopAnimation = function() {
    if(this.isAnimation)
    {
        clearInterval(this.intervalAnimation);

        this.imageId = items[this.itemId].imageId;
    }
};