function Bloc(id, blocId, x, y, parentPos, childPos) {
    this.id = id;
    this.blocId = blocId;
    this.imageId = blocs[blocId].imageId;
    this.name = blocs[blocId].name;

    this.x = x;
    this.y = y;

    this.parentPos = null;
    this.childPos = null;

    this.canGo = blocs[blocId].canGo;

    this.isAnimation = blocs[blocId].isAnimation;

    this.setFamily(parentPos, childPos);
}

Bloc.prototype.setFamily = function(parentPos, childPos)
{
    if(parentPos != null)
    {
        this.parentPos = {
            x : parentPos[0],
            y : parentPos[1]
        };
    }

    if(childPos != null)
    {
        this.childPos = {
            x : childPos[0],
            y : childPos[1]
        };
    }
};

Bloc.prototype.startAction = function(map) {
    console.log('startAction');

    if(this.isAnimation)
    {
        setTimeout(function(classBloc) {
            console.log('blocId : ' + classBloc.blocId);
            var inverseBloc = blocs[classBloc.blocId].inverseBloc;

            console.log('inverseBloc : ' + inverseBloc);

            classBloc.blocId = inverseBloc;
            classBloc.imageId = blocs[inverseBloc].imageId;
            classBloc.name = blocs[inverseBloc].name;
            classBloc.canGo = blocs[inverseBloc].canGo;

            var inverseBlocChild = blocs[map.land[classBloc.childPos.y][classBloc.childPos.x].blocId].inverseBloc;

            map.land[classBloc.childPos.y][classBloc.childPos.x].blocId = inverseBlocChild;
            map.land[classBloc.childPos.y][classBloc.childPos.x].imageId = blocs[inverseBlocChild].imageId;
            map.land[classBloc.childPos.y][classBloc.childPos.x].name = blocs[inverseBlocChild].name;
            map.land[classBloc.childPos.y][classBloc.childPos.x].canGo = blocs[inverseBlocChild].canGo;
        }, 500, this);
    }
};

Bloc.prototype.stopAction = function(map) {
    console.log('stopAnimation');

    if(this.isAnimation)
    {
        setTimeout(function(classBloc) {
            console.log('ok');

            console.log('blocId : ' + classBloc.blocId);
            var inverseBloc = blocs[classBloc.blocId].inverseBloc;

            console.log('inverseBloc : ' + inverseBloc);

            classBloc.blocId = inverseBloc;
            classBloc.imageId = blocs[inverseBloc].imageId;
            classBloc.name = blocs[inverseBloc].name;
            classBloc.canGo = blocs[inverseBloc].canGo;

            var inverseBlocChild = blocs[map.land[classBloc.childPos.y][classBloc.childPos.x].blocId].inverseBloc;

            map.land[classBloc.childPos.y][classBloc.childPos.x].blocId = inverseBlocChild;
            map.land[classBloc.childPos.y][classBloc.childPos.x].imageId = blocs[inverseBlocChild].imageId;
            map.land[classBloc.childPos.y][classBloc.childPos.x].name = blocs[inverseBlocChild].name;
            map.land[classBloc.childPos.y][classBloc.childPos.x].canGo = blocs[inverseBlocChild].canGo;
        }, 2000, this);
    }
};