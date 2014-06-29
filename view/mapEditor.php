<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.ico">

    <title>CubipixJS - Game</title>

    <!-- Bootstrap core CSS -->
    <link href="view/css/bootstrap.min.css" rel="stylesheet">

    <link href="view/css/style.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>

<!-- Fixed navbar -->
<div class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">CubipixJS</a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="index.php">Home</a></li>
                <li class="active"><a href="index.php?type=game">Game</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>

<div id="content">
    <div id="mapEditor">
        <canvas id="canvas"></canvas>
    </div>
    <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Map editor</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="dropup">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Blocs <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-header">General blocs</li>
                            <li class="dropdown-submenu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="view/img/texture/0.png"> Materials</a>
                                <ul class="dropdown-menu">
                                    <li id="liButton0t" class="active"><a href="#" onclick="setBloc(0, 't', 0);"><img src="view/img/texture/0.png"> Empty</a></li>
                                    <li id="liButton1t"><a href="#" onclick="setBloc(1, 't', 1);"><img src="view/img/texture/1.png" style="width: 32px; height: auto;"> Brick</a></li>
                                    <li id="liButton2t"><a href="#" onclick="setBloc(2, 't', 2);"><img src="view/img/texture/2.png" style="width: 32px; height: auto;"> Grass</a></li>
                                    <li id="liButton3t"><a href="#" onclick="setBloc(8, 't', 3);"><img src="view/img/texture/23.png" style="width: 32px; height: auto;"> Water</a></li>
                                </ul>
                            </li>
                            <li class="dropdown-submenu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="view/img/texture/3.png" style="width: 32px; height: auto;"> Corners</a>
                                <ul class="dropdown-menu">
                                    <li class="dropdown-header">In</li>
                                    <li id="liButton4t"><a href="#" onclick="setBloc(3, 't', 4);"><img src="view/img/texture/3.png" style="width: 32px; height: auto;"> Ground</a></li>
                                    <li id="liButton5t"><a href="#" onclick="setBloc(6, 't', 5);"><img src="view/img/texture/15.png" style="width: 32px; height: auto;"> Grass</a></li>
                                    <li id="liButton6t"><a href="#" onclick="setBloc(9, 't', 6);"><img src="view/img/texture/24.png" style="width: 32px; height: auto;"> Water</a></li>
                                    <li class="dropdown-header">Out</li>
                                    <li id="liButton7t"><a href="#" onclick="setBloc(5, 't', 7);"><img src="view/img/texture/11.png" style="width: 32px; height: auto;"> Ground</a></li>
                                    <li id="liButton8t"><a href="#" onclick="setBloc(11, 't', 8);"><img src="view/img/texture/32.png" style="width: 32px; height: auto;"> Water</a></li>
                                </ul>
                            </li>
                            <li class="dropdown-submenu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="view/img/texture/7.png" style="width: 32px; height: auto;"> Sides</a>
                                <ul class="dropdown-menu">
                                    <li id="liButton9t"><a href="#" onclick="setBloc(4, 't', 9);"><img src="view/img/texture/7.png" style="width: 32px; height: auto;"> Ground</a></li>
                                    <li id="liButton10t"><a href="#" onclick="setBloc(7, 't', 10);"><img src="view/img/texture/19.png" style="width: 32px; height: auto;"> Grass</a></li>
                                    <li id="liButton11t"><a href="#" onclick="setBloc(10, 't', 11);"><img src="view/img/texture/28.png" style="width: 32px; height: auto;"> Water</a></li>
                                </ul>
                            </li>
                            <li class="divider"></li>
                            <li class="dropdown-header">Spawn</li>
                            <li id="liButton12t"><a href="#" onclick="setBloc(100, 't', 12);"><img src="view/img/texture/100.png" style="width: 32px; height: auto;"> Spawn block</a></li>
                        </ul>
                    </li>
                    <li class="dropup">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Items <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-header">Good</li>
                            <li id="liButton1i"><a href="#" onclick="setBloc(1, 'i', 1);"><img src="view/img/item/1.png"> Coin</a></li>
                            <li id="liButton2i"><a href="#" onclick="setBloc(5, 'i', 2);"><img src="view/img/item/10.png"> Heart</a></li>
                            <li class="divider"></li>
                            <li class="dropdown-header">Bad</li>
                            <li id="liButton3i"><a href="#" onclick="setBloc(100, 'i', 3);"><img src="view/img/item/100.png"> Stinging plant (1 health)</a></li>
                            <li class="divider"></li>
                            <li class="dropdown-header">Tool</li>
                            <li id="liButton0i"><a href="#" onclick="setBloc(0, 'i', 0);"><span class="glyphicon glyphicon-remove"></span> Delete item</a></li>
                        </ul>
                    </li>
                    <li><a href="#mobsModal" data-toggle="modal">Mobs</a></li>
                    <li><a href="#playerModal" data-toggle="modal">Player</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropup">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-resize-full"></span> Resize map <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" onclick="addLineWidth();"><span class="glyphicon glyphicon-resize-horizontal"></span> add a line (width)</a></li>
                            <li><a href="#" onclick="addLineHeight();"><span class="glyphicon glyphicon-resize-vertical"></span> add a line (height)</a></li>
                        </ul>
                    </li>
                    <li><a href="#mapInformationsModal" data-toggle="modal">Map informations</a></li>
                    <button type="button" id="buttonSaveMap" onclick="saveMap();" class="btn btn-success navbar-btn">Save</button>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        <div id="dropdownOptionDiv" class="dropdown clearfix" style="position: fixed;">
            <button type="button" id="dropdownOption" class="btn dropdown-toggle sr-only" data-toggle="dropdown">Dropdown<span class="caret"></span></button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><a tabindex="-1" href="#">Action</a></li>
                <li><a tabindex="-1" href="#">Another action</a></li>
                <li><a tabindex="-1" href="#">Something else here</a></li>
                <li class="divider"></li>
                <li><a tabindex="-1" href="#">Separated link</a></li>
            </ul>
        </div>
    </div>
    <div id="images" style="display: none;"></div>
    <div id="startMapEditorModal" class="modal fade bs-example-modal-lg" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Map editor</h4>
                </div>
                <div class="modal-body">
                    <p>Welcome on the map editor.</p>
                    <h4>Create a map</h4>
                    <form method="post" onsubmit="startMapEditor(this.widthMapBloc.value, this.heightMapBloc.value);return false" class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">WIDTH</label>
                            <div class="col-sm-10">
                                <input type="text" id="widthMapBloc" name="widthMapBloc" class="form-control" value="25">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">HEIGHT</label>
                            <div class="col-sm-10">
                                <input type="text" id="heightMapBloc" name="heightMapBloc" class="form-control" value="15">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="submit" class="btn btn-default">Start</button>
                            </div>
                        </div>
                    </form>
                    <h4>Load a map</h4>
                    <div class="list-group">
                        <?php
                        if($listMaps != NULL)
                        {
                            foreach($listMaps as $map)
                            {
                                echo '<a href="#" onclick="loadMap(\'' . $map['mUId'] . '\');" class="list-group-item"><h4 class="list-group-item-heading">' . $map['name'] . '</h4><p class="list-group-item-text">' . $map['description'] . '</p></a>';
                            }
                        }
                        else
                        {
                            echo 'You don\'t have any map.';
                        }?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="mapInformationsModal" class="modal fade bs-example-modal-lg" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Map informations</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Name</label>
                            <div class="col-sm-4">
                                <input type="text" id="mapName" name="mapName" onkeyup="setNameMap(this.value);" class="form-control" value="Map">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Description</label>
                            <div class="col-sm-4">
                                <textarea id="mapDescription" name="mapDescription" onkeyup="setDescriptionMap(this.value);" class="form-control">Description</textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Difficult</label>
                            <div class="col-sm-4">
                                <select id="mapDifficult" name="mapDifficult" onchange="setDifficultMap(this.value);" class="form-control">
                                    <option value="0">Easy</option>
                                    <option value="1">Medium</option>
                                    <option value="2">Hard</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Texture</label>
                            <div class="col-sm-4">None</div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-12">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div id="mobsModal" class="modal fade bs-example-modal-lg" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Mobs</h4>
                </div>
                <div class="modal-body">
                    <div id="mobs" class="list-group"></div>
                    <button type="button" onclick="addMob(0, 0, 0, 0);" class="btn btn-success">Add mob</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div id="playerModal" class="modal fade bs-example-modal-lg" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Player</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Direction</label>
                            <div class="col-sm-4">
                                <select id="directionPlayer" name="directionPlayer" onchange="setDirectionPlayer(this.value);" class="form-control">
                                    <option value="0">UP - DOWN</option>
                                    <option value="1">LEFT - RIGHT</option>
                                    <option value="2">RIGHT - LEFT</option>
                                    <option value="3">DOWN - UP</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">X</label>
                            <div class="col-sm-4">
                                <input type="text" id="posXPlayer" name="posXPlayer" class="form-control" value="None" disabled="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Y</label>
                            <div class="col-sm-4">
                                <input type="text" id="posYPlayer" name="posYPlayer" class="form-control" value="None" disabled="">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-12">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div id="loadMapEditorModal" class="modal fade bs-example-modal-lg" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Loading of Map Editor</h4>
                </div>
                <div class="modal-body">
                    <div class="progress">
                        <div id="progressLoadMapEditor" class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
                            <span class="sr-only">0% Complete</span>
                        </div>
                    </div>
                    <span id="infoLoadMapEditor">Loading textures & items ...</span>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="footer">
    <div class="container">
        <p class="text-muted">CubipixJS par <a href="http://dgiproject.alwaysdata.net" target="_blank">DGI Project</a></p>
    </div>
</div>


<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="view/js/jquery.noty.packaged.min.js"></script>
<script src="view/js/bootstrap.min.js"></script>
<script src="view/js/blocs.js"></script>
<script src="view/js/items.js"></script>
<script src="view/js/mapEditor.js"></script>

</body>
</html>