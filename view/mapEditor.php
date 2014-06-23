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
        <h2>Map</h2>
        <canvas id="canvas"></canvas>
    </div>
    <div class="container">
        <h4>Blocs</h4>
        <div id="blocs">
            <button type="button" id="button0t" onclick="setBloc(0, 't');" class="btn btn-default disabled"><img id="0t" src="view/img/texture/0.png"></button>
            <button type="button" id="button1t" onclick="setBloc(1, 't');" class="btn btn-default"><img id="1t" src="view/img/texture/1.png"></button>
            <button type="button" id="button2t" onclick="setBloc(2, 't');" class="btn btn-default"><img id="2t" src="view/img/texture/2.png"></button>
            <button type="button" id="button3t" onclick="setBloc(3, 't');" class="btn btn-default"><img id="3t" src="view/img/texture/3.png"></button>
            <button type="button" id="button4t" onclick="setBloc(4, 't');" class="btn btn-default"><img id="4t" src="view/img/texture/4.png"></button>
            <button type="button" id="button5t" onclick="setBloc(5, 't');" class="btn btn-default"><img id="5t" src="view/img/texture/5.png"></button>
            <button type="button" id="button6t" onclick="setBloc(6, 't');" class="btn btn-default"><img id="6t" src="view/img/texture/6.png"></button>
            <button type="button" id="button7t" onclick="setBloc(7, 't');" class="btn btn-default"><img id="7t" src="view/img/texture/7.png"></button>
            <button type="button" id="button8t" onclick="setBloc(8, 't');" class="btn btn-default"><img id="8t" src="view/img/texture/8.png"></button>
            <button type="button" id="button9t" onclick="setBloc(9, 't');" class="btn btn-default"><img id="9t" src="view/img/texture/9.png"></button>
            <button type="button" id="button10t" onclick="setBloc(10, 't');" class="btn btn-default"><img id="10t" src="view/img/texture/10.png"></button>
            <button type="button" id="button11t" onclick="setBloc(11, 't');" class="btn btn-default"><img id="11t" src="view/img/texture/11.png"></button>
            <button type="button" id="button12t" onclick="setBloc(12, 't');" class="btn btn-default"><img id="12t" src="view/img/texture/12.png"></button>
            <button type="button" id="button13t" onclick="setBloc(13, 't');" class="btn btn-default"><img id="13t" src="view/img/texture/13.png"></button>
            <button type="button" id="button14t" onclick="setBloc(14, 't');" class="btn btn-default"><img id="14t" src="view/img/texture/14.png"></button>
            <button type="button" id="button15t" onclick="setBloc(15, 't');" class="btn btn-default"><img id="15t" src="view/img/texture/15.png"></button>
        </div>
        <h4>Items</h4>
        <div id="items">
            <button type="button" id="button0i" onclick="setBloc(0, 'i');" class="btn btn-default"><span class="glyphicon glyphicon-remove"></span></button>
            <button type="button" id="button1i" onclick="setBloc(1, 'i');" class="btn btn-default"><img id="1i" src="view/img/item/1.png"></button>
            <button type="button" id="button2i" onclick="setBloc(2, 'i');" class="btn btn-default"><img id="2i" src="view/img/item/2.png"></button>
        </div>
        <h4>Mobs</h4>
        <div id="mobs" class="list-group"></div>
        <button type="button" onclick="addMob();" class="btn btn-success">Add mob</button>
        <h2>Informations</h2>
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
                    <button type="button" id="buttonSaveMap" onclick="saveMap();" class="btn btn-success btn-lg btn-block">Save map</button>
                </div>
            </div>
        </form>
    </div>
    <div id="dropdownOptionDiv" class="dropdown clearfix">
        <button type="button" id="dropdownOption" class="btn dropdown-toggle sr-only" data-toggle="dropdown">Dropdown<span class="caret"></span></button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><a tabindex="-1" href="#">Action</a></li>
            <li><a tabindex="-1" href="#">Another action</a></li>
            <li><a tabindex="-1" href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a tabindex="-1" href="#">Separated link</a></li>
        </ul>
    </div>
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
                                <input type="text" id="widthMapBloc" name="widthMapBloc" class="form-control" value="20">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">HEIGHT</label>
                            <div class="col-sm-10">
                                <input type="text" id="heightMapBloc" name="heightMapBloc" class="form-control" value="10">
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
<script src="view/js/mapEditor.js"></script>

</body>
</html>