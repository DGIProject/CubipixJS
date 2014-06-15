<?php
if($_SESSION['user'] != NULL)
{
    include_once 'model/game.php';

    if($_GET['mapId'] != NULL)
    {
        $map = getInfoMap($_GET['mapId']);
        $score = getBestScoreMap($_GET['mapId']);

        include_once 'view/game.php';
    }
    else
    {
        $listMaps = getListMaps();

        include_once 'view/dashboard.php';
    }
}
else
{
    echo 'noLogged';
}