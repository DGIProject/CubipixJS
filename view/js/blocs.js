var blocs = {
    0 : {
        imageId : [0, 0, 0, 0],
        name : 'Empty',
        canGo : true,
        isAnimation : false
    },
    1 : {
        imageId : [1, 1, 1, 1],
        name : 'Brick block',
        canGo : true,
        isAnimation : false
    },
    2 : {
        imageId : [2, 2, 2, 2],
        name : 'Grass block',
        canGo : false,
        isAnimation : false
    },
    3 : {
        imageId : [3, 4, 5, 6],
        name : 'Brick corner',
        canGo : true,
        isAnimation : false
    },
    4 : {
        imageId : [7, 8, 9, 10],
        name : 'Ground side',
        canGo : true,
        isAnimation : false
    },
    5 : {
        imageId : [11, 12, 13, 14],
        name : 'Brick corner out',
        canGo : true,
        isAnimation : false
    },
    6 : {
        imageId : [15, 16, 17, 18],
        name : 'Grass corner',
        canGo : false,
        isAnimation : false
    },
    7 : {
        imageId : [19, 20, 21, 22],
        name : 'Grass side',
        canGo : false,
        isAnimation : false
    },
    8 : {
        imageId : [23, 23, 23, 23],
        name : 'Water block',
        canGo : false,
        isAnimation : false
    },
    9 : {
        imageId : [24, 25, 26, 27],
        name : 'Water corner',
        canGo : false,
        isAnimation : false
    },
    10 : {
        imageId : [28, 29, 30, 31],
        name : 'Water side',
        canGo : false,
        isAnimation : false
    },
    11 : {
        imageId : [32, 33, 34, 35],
        name : 'Water corner out',
        canGo : false,
        isAnimation : false
    },
    100 : {
        imageId : [100, 100, 100, 100],
        name : 'Spawn block',
        canGo : true,
        isAnimation : false
    },
    200 : {
        imageId : [200, 200, 200, 200],
        name : 'Button block on',
        canGo : true,
        isAnimation : true,
        inverseBloc : 201
    },
    201 : {
        imageId : [201, 201, 201, 201],
        name : 'Button block off',
        canGo : true,
        isAnimation : true,
        inverseBloc : 200
    },
    202 : {
        imageId : [202, 203, 204, 205],
        name : 'Fence block on',
        canGo : false,
        isAnimation : false,
        inverseBloc : 203
    },
    203 : {
        imageId : [206, 207, 208, 209],
        name : 'Fence block off',
        canGo : true,
        isAnimation : false,
        inverseBloc : 202
    }
};