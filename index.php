<?php
include_once 'model/sql_connect.php';

if($_GET['type'] == 'game')
{
    if($_SESSION['user'] != NULL)
    {
        include_once 'controler/game.php';
    }
    else
    {
        include_once 'controler/login.php';
    }
}
elseif($_GET['type'] == 'mapEditor')
{
    include_once 'controler/mapEditor.php';
}
elseif($_GET['type'] == 'register')
{
    include_once 'controler/register.php';
}
else
{
    include_once 'controler/index.php';
}