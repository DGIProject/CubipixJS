<?php
if($_POST['sUid'] != NULL)
{
    if(!file_exists('files/' . $_POST['sUid'] . '.cs'))
    {
        $file = fopen('files/' . $_POST['sUid'] . '.cs', 'w');
        fwrite($file, $_POST['sUid']);
        fclose($file);

        //echo 'false' . $_POST['uid'];
    }

    sleep(2);

    if(file_exists('files/' . $_POST['uUid'] . '.cr'))
    {
        $file = fopen('files/' . $_POST['uUid'] . '.cr', 'w');
        fwrite($file, $_POST['posX'] . '||' . $_POST['posY']);
        fclose($file);

        //echo 'true';
    }
    else
    {
        $fileServer = fopen('files/' . $_POST['sUid'] . '.cs', 'r');

        $listPlayers = NULL;
        $listPlayers = fread($fileServer, 255) . '||' . $_POST['uUid'];

        fclose($fileServer);

        unlink('files/' . $_POST['sUid'] . '.cs');

        $fileServer = fopen('files/' . $_POST['sUid'] . '.cs', 'w');
        fwrite($fileServer, $listPlayers);
        fclose($fileServer);

        $file = fopen('files/' . $_POST['uUid'] . '.cr', 'w');
        fwrite($file, $_POST['posX'] . '||' . $_POST['posY']);
        fclose($file);

        //echo 'false' . $listPlayers;
    }

    $fileServer = fopen('files/' . $_POST['sUid'] . '.cs', 'r');

    $tabServer = explode('||', fread($fileServer, 255));
    $tabPlayers = array();

    for($i = 0; $i < count($tabServer); $i++)
    {
        if($i != 0)
        {
            $filePlayer = fopen('files/' . $tabServer[$i] . '.cr', 'r');

            $tabInfoPlayer = explode('||', fread($filePlayer, 255));

            $tabPlayers[($i - 1)] = array($tabServer[$i], $tabInfoPlayer[0], $tabInfoPlayer[1]);
        }
    }

    echo json_encode($tabPlayers);

}
else
{
    echo 'callAServer';
}