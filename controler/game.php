<?php
if($_SESSION['user'] != NULL)
{
    include_once 'model/game.php';
    include_once 'view/game.php';
}
else
{
    echo 'noLogged';
}