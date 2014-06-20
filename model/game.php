<?php
function getListLevels()
{
    global $bdd;

    $req = $bdd->prepare('SELECT * FROM levels ORDER BY numberL');
    $req->execute();

    return $req->fetchAll();
}

function getListServers()
{
    global $bdd;

    $req = $bdd->prepare('SELECT * FROM servers ORDER BY id');
    $req->execute();

    return $req->fetchAll();
}

function getListMaps()
{
    global $bdd;

    $req = $bdd->prepare('SELECT * FROM maps WHERE usernameId = ? ORDER BY id');
    $req->execute(array($_SESSION['userId']));

    return $req->fetchAll();
}

function getInfoMap($mUId)
{
    global $bdd;

    $req = $bdd->prepare('SELECT * FROM maps WHERE mUId = ?');
    $req->execute(array($mUId));

    return $req->fetch();
}

function addScore($mapId, $win, $points, $health, $timeG)
{
    global $bdd;

    $req = $bdd->prepare('INSERT INTO score (usernameId, mapId, win, points, health, timeG) VALUES (:usernameId, :mapId, :win, :points, :health, :timeG)');

    if($req->execute(array('usernameId' => $_SESSION['userId'], 'mapId' => $mapId, 'win' => $win, 'points' => $points, 'health' => $health, 'timeG' => $timeG)))
    {
        return 'true';
    }
    else
    {
        return 'false';
    }
}

function getRanking($mapId, $points)
{
    global $bdd;

    $req = $bdd->prepare('SELECT COUNT(*) AS ranking FROM score WHERE mapId = ? AND points >= ?');
    $req->execute(array($mapId, $points));

    $return = $req->fetch();
    return $return['ranking'];
}