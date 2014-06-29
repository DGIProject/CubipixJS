function Item(id, itemId, x, y)
{
    this.id = id;
    this.itemId = itemId;
    this.imageId = items[itemId].imageId;
    this.name = items[itemId].name;
    this.rowImage = 0;

    this.x = x;
    this.y = y;

    this.isAnimation = items[itemId].isAnimation;

    if(this.isAnimation)
    {
        this.startAnimation();
    }
}

Item.prototype.startAnimation = function() {
    if(this.isAnimation)
    {
        this.intervalAnimation = setInterval(function(classItem) {
            var countImage = classItem.imageId.length;
            classItem.rowImage++;

            if(classItem.rowImage == countImage)
            {
                classItem.rowImage = 0;
            }
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