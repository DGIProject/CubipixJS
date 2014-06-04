<?php
include_once 'model/login.php';

if($_GET['a'] == 'login')
{
    echo loginGame($_POST['username'], $_POST['password']);

    exit();
}

include_once 'view/login.php';