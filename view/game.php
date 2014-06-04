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
    <div id="game">
        <div id="toolbar" style="width: 800px;">
            <span id="player">Player : <?php echo $_SESSION['user']; ?></span>,
            <span id="map">Map : <span id="currentMap"></span></span>,
            <span id="coin">
                Coin : <span id="currentCoins">0</span> / <span id="totalCoins">0</span>
            </span>,
            <span id="health">
                Health : <progress id="currentHealth" value="0" max="10"></progress>
            </span>
        </div>
        <canvas id="canvas"></canvas>
    </div>
    <div id="startGameModal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Start game</h4>
                </div>
                <div class="modal-body">
                    <p>Choose the map that you want.</p>
                    <div class="list-group">
                        <?php
                        foreach($listMaps as $map)
                        {
                            echo '<a href="#" onclick="startGame(\'' . $map['name'] . '\');" class="list-group-item"><h4 class="list-group-item-heading">' . $map['name'] . '</h4><p class="list-group-item-text">' . $map['description'] . '</p></a>';
                        }?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="textures" style="display: none;">
        <img id="1t" src="view/img/texture/1.png">
        <img id="2t" src="view/img/texture/2.png">
        <img id="3t" src="view/img/texture/3.png">
        <img id="4t" src="view/img/texture/4.png">
        <img id="5t" src="view/img/texture/5.png">
        <img id="6t" src="view/img/texture/6.png">
        <img id="7t" src="view/img/texture/7.png">
        <img id="8t" src="view/img/texture/8.png">
        <img id="9t" src="view/img/texture/9.png">
        <img id="10t" src="view/img/texture/10.png">

        <img id="1i" src="view/img/item/1.png">
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
<script src="view/js/bootstrap.min.js"></script>
<script src="view/js/class/Map.js"></script>
<script src="view/js/class/Player.js"></script>
<script src="view/js/game.js"></script>

</body>
</html>