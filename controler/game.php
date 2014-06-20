<?php
if($_SESSION['userId'] != NULL)
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

    if($_GET['mUId'] != NULL)
    {
        $map = getInfoMap($_GET['mUId']);

        include_once 'view/game.php';
    }
    else
    {
        $listLevels = getListLevels();
        $listMaps = getListMaps();
        $listServers = getListServers();

        include_once 'view/dashboard.php';
    }
}
else
{
    echo 'noLogged';
}