<?php
if($_POST['sUId'] != NULL)
{
    if(!file_exists('files/' . $_POST['sUId'] . '.cs'))
    {
        $file = fopen('files/' . $_POST['sUId'] . '.cs', 'w');
        fwrite($file, $_POST['sUId']);
        fclose($file);

        sleep(1);

        //if($_POST['samePos'] == 0)
        //{
            actualizePlayer($_POST['sUId'], $_POST['uUId'], $_POST['posX'], $_POST['posY'], $_POST['direction']);
        //}

        exit();
    }

    //if($_POST['samePos'] == 0)
    //{
        actualizePlayer($_POST['sUId'], $_POST['uUId'], $_POST['posX'], $_POST['posY'], $_POST['direction']);
    //}

    $fileServer = fopen('files/' . $_POST['sUId'] . '.cs', 'r');

    $tabServer = explode('||', fread($fileServer, 255));
    $tabPlayers = array();

    for($i = 0; $i < count($tabServer); $i++)
    {
        if($i != 0)
        {
            $filePlayer = fopen('files/' . $tabServer[$i] . '.cr', 'r');

            $tabInfoPlayer = explode('||', fread($filePlayer, 255));

            $tabPlayers[($i - 1)] = array($tabServer[$i], $tabInfoPlayer[0], $tabInfoPlayer[1], $tabInfoPlayer[2]);
        }
    }

    echo json_encode($tabPlayers);

}
else
{
    echo 'callAServer';
}

function actualizePlayer($sUId, $uUId, $posX, $posY, $direction)
{
    if(file_exists('files/' . $uUId . '.cr'))
    {
        $file = fopen('files/' . $uUId . '.cr', 'w');
        fwrite($file, $posX . '||' . $posY . '||' . $direction);
        fclose($file);
    }
    else
    {
        $fileServer = fopen('files/' . $sUId . '.cs', 'r');

        $listPlayers = fread($fileServer, 255) . '||' . $uUId;

        fclose($fileServer);

        unlink('files/' . $sUId . '.cs');

        $fileServer = fopen('files/' . $sUId . '.cs', 'w');
        fwrite($fileServer, $listPlayers);
        fclose($fileServer);

        $file = fopen('files/' . $uUId . '.cr', 'w');
        fwrite($file, $posX . '||' . $posY . '||' . $direction);
        fclose($file);

        //echo 'false' . $listPlayers;
    }
}