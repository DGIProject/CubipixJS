<?php
if($_SESSION['userId'] != NULL)
{
    include_once 'model/mapEditor.php';

    if($_GET['a'] == 'generateFileMap')
    {
        if(generateFileMap($_POST['mUId'], $_POST['json']))
        {
            echo addMap($_POST['mUId'], $_POST['name'], $_POST['description'], $_POST['difficult'], $_POST['alreadyEdited']);
        }
        else
        {
            echo 'false';
        }

        exit();
    }
    elseif($_GET['a'] == 'getInfoMap')
    {
        echo getInfoMap($_POST['mUId']);

        exit();
    }

    $listMaps = getListMaps();

    include_once 'view/mapEditor.php';
}
else
{
    header('Location: index.php?type=game');
}