<?php
if($_SESSION['user'] != NULL)
{
    include_once 'model/register.php';

    if($_GET['a'] == 'register')
    {
        echo registerUser($_POST['username'], $_POST['password'], $_POST['email']);

        exit();
    }

    include_once 'view/register.php';
}
else
{
    echo 'alreadyLogged';
}