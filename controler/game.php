<?php
if($_SESSION['user'] != NULL)
{
    include_once 'model/game.php';

    if($_GET['a'] == 'addScore')
    {
        echo addScore($_POST['mapId'], $_POST['win'], $_POST['points'], $_POST['health'], $_POST['timeG']);

        exit();
    }
    elseif($_GET['a'] == 'getRanking')
    {
        echo getRanking($_POST['mapId'], $_POST['points']);

        exit();
    }

    if($_GET['mapId'] != NULL)
    {
        $map = getInfoMap($_GET['mapId']);

        include_once 'view/game.php';
    }
    else
    {
        $listLevels = getListLevels();
        $listMaps = getListMaps();

        include_once 'view/dashboard.php';
    }
}
else
{
    echo 'noLogged';
}