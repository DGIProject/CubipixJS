<?php
session_start();

try
{
    $bdd = new PDO('mysql:host=mysql2.alwaysdata.com;dbname=pox_cubipix' , 'pox_cubipix' , 'cubipix');
}
catch(Exception $e)
{
    die('Erreur : '.$e->getMessage());
}