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

function getBestScoreMap($mapId)
{
    global $bdd;

    $req = $bdd->prepare('SELECT * FROM score WHERE usernameId = ? AND mapId = ? ORDER BY timeG DESC');
    $req->execute(array($_SESSION['userId'], $mapId));

    return $req->fetch();
}