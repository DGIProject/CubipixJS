<?php
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

    $map = $req->fetch();

    return json_encode(array($map['name'], $map['description'], $map['difficult'], $map['texture']));
}

function generateFileMap($mUId, $json)
{
    $file = fopen('maps/' . $mUId . '.cm', "w");

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

function addMap($mUId, $name, $description, $difficult, $alreadyEdited)
{
    global $bdd;

    $req = NULL;

    if($alreadyEdited == 1)
    {
        $req = $bdd->prepare('UPDATE maps SET name = :name, description = :description, difficult = :difficult WHERE mUId = :mUId AND usernameId = :usernameId');
    }
    else
    {
        $req = $bdd->prepare('INSERT INTO maps (mUId, usernameId, name, description, difficult) VALUES (:mUId, :usernameId, :name, :description, :difficult)');
    }

    if($req->execute(array('mUId' => $mUId, 'usernameId' => $_SESSION['userId'], 'name' => $name, 'description' => $description, 'difficult' => $difficult)))
    {
        return 'true';
    }
    else
    {
        return 'false';
    }
}