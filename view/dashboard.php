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
                <li><a href="index.php#about">About</a></li>
                <li><a href="index.php#contact">Contact</a></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>

<div class="container">
    <a href="controler/logout.php" class="btn btn-default">Logout</a>
    <div class="page-header">
        <h1>Map solo</h1>
    </div>
    <h4>Levels</h4>
    <div class="list-group">
        <?php
        if($listLevels != NULL)
        {
            foreach($listLevels as $level)
            {
                echo '<a href="index.php?type=game&mUId=' . $level['lUId'] . '" class="list-group-item"><span class="pull-right">Ranking : <button type="button" class="btn btn-success"><span class="glyphicon glyphicon-edit"></span></button> <button type="button" class="btn btn-info"><span class="glyphicon glyphicon-share"></span></button></span><h4 class="list-group-item-heading">' . $level['name'] . '</h4><p class="list-group-item-text">' . $level['description'] . '</p></a>';
            }
        }
        else
        {
            echo '<p>There is no levels.</p>';
        }?>
    </div>
    <h4>My maps</h4>
    <div class="list-group">
        <?php
        if($listMaps != NULL)
        {
            foreach($listMaps as $map)
            {
                echo '<a href="index.php?type=game&mUId=' . $map['mUId'] . '" class="list-group-item"><span class="pull-right">Ranking : <button type="button" class="btn btn-success"><span class="glyphicon glyphicon-edit"></span></button> <button type="button" class="btn btn-info"><span class="glyphicon glyphicon-share"></span></button></span><h4 class="list-group-item-heading">' . $map['name'] . '</h4><p class="list-group-item-text">' . $map['description'] . '</p></a>';
            }
        }
        else
        {
            echo '<p>You don\'t have any map.</p>';
        }?>
    </div>
    <a href="index.php?type=mapEditor" class="btn btn-success">Map editor</a>
    <div class="page-header">
        <h1>Map multiplayer</h1>
    </div>
    <div class="list-group">
        <?php
        if($listServers != NULL)
        {
            foreach($listServers as $server)
            {
                echo '<a href="index.php?type=game&mUId=' . $server['mUId'] . '&sUId=' . $server['sUId'] . '" class="list-group-item"><h4 class="list-group-item-heading">' . $server['name'] . '</h4><p class="list-group-item-text">' . $server['description'] . '</p></a>';
            }
        }
        else
        {
            echo '<p>There is no servers available now.</p>';
        }?>
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

</body>
</html>