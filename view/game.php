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

<body id="bodyGame">

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
                <li><a href="index.php#about">About</a></li>
                <li><a href="index.php#contact">Contact</a></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>

<div id="content">
    <div id="game">
        <canvas id="canvas"></canvas>
    </div>
    <div id="informations">
        <span id="mapName">
            <span id="currentMap"></span>, <span id="countdown">3</span>
        </span>
        </br>
        <div id="players"></div>
        <div id="logMultiplayer"></div>
    </div>
    <div id="images" style="display: none;"></div>
    <div id="startGameModal" class="modal fade bs-example-modal-lg" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Start game</h4>
                </div>
                <div class="modal-body">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Map : <?php echo $map['name']; ?></h3>
                        </div>
                        <div class="panel-body">
                            <?php echo $map['description']; ?>
                            <hr>
                            <span>Difficult : <span id="mapDifficult"><?php echo getDifficult($map['difficult']); ?></span></span></br>
                            <span>Editor : <span id="mapEditorUsername"><?php echo getUsername($map['usernameId']); ?></span></span></br>
                            <span>Date create : <span id="mapDateCreate"><?php echo $map['date']; ?></span></span></br>
                            <span>Total players : <span id="mapTotalPlayers">0</span></span>
                        </div>
                    </div>
                    <div id="playersStart"></div>
                    <button type="button" id="buttonAddPlayer" onclick="addPlayer(false);" class="btn btn-default" disabled="">Add player</button>
                    <hr>
                    <div id="loadMap">
                        <img src="view/img/ajax-loader.gif"> Chargement de la map en cours ...
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="menuGameModal" class="modal fade bs-example-modal-lg" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Menu</h4>
                </div>
                <div class="modal-body">
                    <h4>Controls</h4>
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">UP</label>
                            <div class="col-sm-10">
                                <select id="upControl" onchange="updateControls(0, this.value);" class="form-control">
                                    <option value="90">Z</option>
                                    <option value="38">Key up</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">LEFT</label>
                            <div class="col-sm-10">
                                <select id="leftControl" onchange="updateControls(1, this.value);" class="form-control">
                                    <option value="81">Q</option>
                                    <option value="37">Key left</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">RIGHT</label>
                            <div class="col-sm-10">
                                <select id="rightControl" onchange="updateControls(2, this.value);" class="form-control">
                                    <option value="68">D</option>
                                    <option value="39">Key right</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">DOWN</label>
                            <div class="col-sm-10">
                                <select id="downControl" onchange="updateControls(3, this.value);" class="form-control">
                                    <option value="83">S</option>
                                    <option value="40">Key down</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <h4>Volume</h4>
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Music</label>
                            <div class="col-sm-10">
                                <input type="range" name="volumeMusic" onchange="updateVolume(this.value, 'music');" class="form-control" min="0" max="100" value="20">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Sound</label>
                            <div class="col-sm-10">
                                <input type="range" name="volumeSound" onchange="updateVolume(this.value, 'sound');" class="form-control" min="0" max="100" value="10">
                            </div>
                        </div>
                    </form>
                    </br>
                    <button type="button" class="btn btn-default btn-block" data-dismiss="modal">Back</button>
                    <button type="button" onclick="location.href = 'index.php?type=game';" class="btn btn-default btn-block">Exit</button>
                </div>
            </div>
        </div>
    </div>
    <div id="finishGameModal" class="modal fade bs-example-modal-lg" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Finish game</h4>
                </div>
                <div class="modal-body center">
                    <h4 id="titleFG">Unknown</h4>
                    <div id="playersFinish"></div>
                    <button type="button" onclick="location.reload();" class="btn btn-default btn-block">Play again</button>
                    <button type="button" onclick="location.href = 'index.php?type=game';" class="btn btn-default btn-block">Exit</button>
                </div>
            </div>
        </div>
    </div>
    <div id="loadMapModal" class="modal fade bs-example-modal-lg" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Loading of map</h4>
                </div>
                <div class="modal-body">
                    <div class="progress">
                        <div id="progressLoadMap" class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
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
<script src="view/js/soundmanager2.js"></script>
<script src="view/js/blocs.js"></script>
<script src="view/js/items.js"></script>
<script src="view/js/class/Bloc.js"></script>
<script src="view/js/class/Item.js"></script>
<script src="view/js/class/Map.js"></script>
<script src="view/js/class/Player.js"></script>
<script src="view/js/class/Mob.js"></script>
<script src="view/js/game.js"></script>

<script type="text/javascript">
    window.onload = function()
    {
        console.log('loaded');

        canvas = document.getElementById('canvas');
        context2d = canvas.getContext('2d');

        $('#loadMapModal').modal('show');

        setValues("<?php echo $_SESSION['userId']; ?>", "<?php echo $_GET['sUId']; ?>", "<?php echo $_GET['owner']; ?>");
        loadMap("<?php echo $map['mUId']; ?>", "<?php echo $map['name']; ?>");

        loadImages('t');
    };
</script>

</body>
</html>