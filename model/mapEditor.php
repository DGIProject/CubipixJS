<?php
function getListMaps()
{
    global $bdd;

    $req = $bdd->prepare('SELECT * FROM maps WHERE usernameId = ? ORDER BY id');
    $req->execute(array($_SESSION['userId']));

    return $req->fetchAll();
}

function generateFileMap($name, $json)
{
    $file = fopen('maps/' . $name . '.cm', "w");

    if(fwrite($file, $json))
    {
        return true;
    }
    else
    {
        return false;
    }

    fclose($file);
}

function addMap($name, $description, $difficult)
{
    global $bdd;

    $req = $bdd->prepare('INSERT INTO maps (usernameId, name, description, difficult) VALUES (:usernameId, :name, :description, :difficult)');


    if($req->execute(array('usernameId' => $_SESSION['userId'], 'name' => $name, 'description' => $description, 'difficult' => $difficult)))
    {
        return 'true';
    }
    else
    {
        return 'false';
    }
}