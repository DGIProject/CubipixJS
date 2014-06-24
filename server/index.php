<?php
if($_POST['sUId'] != NULL)
{
    $sUId = $_POST['sUId'];
    $uUId = $_POST['uUId'];
    $posX = $_POST['posX'];
    $posY = $_POST['posY'];
    $direction = $_POST['direction'];
    $samePos = $_POST['samePos'];

    $server = $_POST['server'];

    if($server == 'leftUser')
    {
        $fileServer = fopen('files/' . $sUId . '.cs', 'r');

        $listPlayers = json_decode(fread($fileServer, 255));
        $listPlayers[array_search($uUId, $listPlayers)] = NULL;

        fclose($fileServer);

        unlink('files/' . $sUId . '.cs');

        $fileServer = fopen('files/' . $sUId . '.cs', 'w');
        fwrite($fileServer, json_encode($listPlayers));
        fclose($fileServer);

        unlink('files/' . $uUId . '.cr');

        echo json_encode(array('leftUser'));
    }
    else
    {
        if(!file_exists('files/' . $sUId . '.cs'))
        {
            $file = fopen('files/' . $sUId . '.cs', 'w');
            fwrite($file, json_encode(array($sUId, 0)));
            fclose($file);

            sleep(1);

            //if($samePos == 0)
            //{
            actualizePlayer($sUId, $uUId, $posX, $posY, $direction);
            //}

            exit();
        }

        //if($samePos == 0)
        //{
        actualizePlayer($sUId, $uUId, $posX, $posY, $direction);
        //}

        $fileServer = fopen('files/' . $sUId . '.cs', 'r');

        $tabServer = json_decode(fread($fileServer, 255));
        $tabPlayers = array();

        for($i = 0; $i < count($tabServer); $i++)
        {
            if($i > 1 && $tabServer[$i] != NULL)
            {
                $filePlayer = fopen('files/' . $tabServer[$i] . '.cr', 'r');

                $tabInfoPlayer = explode('||', fread($filePlayer, 255));

                $tabPlayers[($i - 2)] = array($tabServer[$i], $tabInfoPlayer[0], $tabInfoPlayer[1], $tabInfoPlayer[2]);
            }
        }

        echo json_encode(array('true', $tabPlayers));
    }
}
else
{
    echo json_encode(array('callAServer'));
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

        $listPlayers = json_decode(fread($fileServer, 255));
        $listPlayers[1] = $listPlayers[1] + 1;
        $listPlayers[$listPlayers[1] + 1] = $uUId;

        fclose($fileServer);

        unlink('files/' . $sUId . '.cs');

        $fileServer = fopen('files/' . $sUId . '.cs', 'w');
        fwrite($fileServer, json_encode($listPlayers));
        fclose($fileServer);

        $file = fopen('files/' . $uUId . '.cr', 'w');
        fwrite($file, $posX . '||' . $posY . '||' . $direction);
        fclose($file);

        //echo 'false' . $listPlayers;
    }
}