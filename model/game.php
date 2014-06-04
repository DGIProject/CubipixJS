<?php
function getListMaps()
{
    global $bdd;

    $req = $bdd->prepare('SELECT * FROM maps ORDER BY id');
    $req->execute();

    return $req->fetchAll();
}