function Bloc(id, name, x, y) {
    this.id = id;
    this.name = name;
    this.image = document.getElementById(id + 't');

    this.x = x;
    this.y = y;
}

Bloc.prototype.setFamily = function(parent, child)
{
    this.parent = parent;
    this.child = child;
}