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

<!-- Begin page content -->
<div class="container">
    <div class="page-header">
        <h1>Game</h1>
    </div>
    <div id="game" class="well">
        <canvas id="canvas"></canvas>
    </div>
    <div id="startGameModal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Démarrer une partie</h4>
                </div>
                <div class="modal-body">
                    <p>Personnalisez un maximum pour une expérience de jeu extraordinaire.</p>
                    <form method="post" onsubmit="startGame();return false" class="form-horizontal">
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <img id="texture" src="view/img/texture/test.png">
    <img id="brick" src="view/img/texture/brick.png">
    <img id="dirt" src="view/img/texture/dirt.png">
</div>

<div id="footer">
    <div class="container">
        <p class="text-muted">CubipixJS par <a href="http://dgiproject.alwaysdata.com" target="_blank">DGI Project</a></p>
    </div>
</div>


<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="view/js/bootstrap.min.js"></script>
<script src="view/js/class/Map.js"></script>
<script src="view/js/class/Player.js"></script>
<script src="view/js/game.js"></script>


</body>
</html>