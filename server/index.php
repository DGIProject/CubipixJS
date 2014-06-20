<?php
if($_GET['sUId'] != NULL)
{
    $sUId = $_GET['sUId'];
    $uUId = $_GET['uUId'];
    $posX = $_GET['posX'];
    $posY = $_GET['posY'];
    $direction = $_GET['direction'];
    $samePos = $_GET['samePos'];

    $server = $_GET['server'];

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
            if($i > 1)
            {
                $filePlayer = fopen('files/' . $tabServer[$i] . '.cr', 'r');

                $tabInfoPlayer = explode('||', fread($filePlayer, 255));

                $tabPlayers[($i - 2)] = array($tabServer[$i], $tabInfoPlayer[0], $tabInfoPlayer[1], $tabInfoPlayer[2]);
            }
        }

        echo json_encode($tabPlayers);
    }
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