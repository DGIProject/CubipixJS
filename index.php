<?php
include_once 'model/sql_connect.php';

if($_SESSION['user'] != NULL)
{
    include_once 'controler/game.php';
}
else
{
    include_once 'controler/login.php';
}