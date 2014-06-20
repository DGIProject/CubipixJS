<?php
if($_SESSION['userId'] != NULL)
{
    include_once 'model/mapEditor.php';

    if($_GET['a'] == 'generateFileMap')
    {
        if(generateFileMap($_POST['name'], $_POST['json']))
        {
            echo addMap($_POST['name'], $_POST['description'], $_POST['difficult']);
        }
        else
        {
            echo 'false';
        }

        exit();
    }

    $listMaps = getListMaps();

    include_once 'view/mapEditor.php';
}
else
{
    echo 'notLogged';
}