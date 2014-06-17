<?php
function getListMaps()
{
    global $bdd;

    $req = $bdd->prepare('SELECT * FROM maps ORDER BY id');
    $req->execute();

    return $req->fetchAll();
}

function getInfoMap($id)
{
    global $bdd;

    $req = $bdd->prepare('SELECT * FROM maps WHERE id = ?');
    $req->execute(array($id));

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