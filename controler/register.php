<?php
if($_SESSION['userId'] == NULL)
{
    include_once 'model/register.php';

    if($_GET['a'] == 'register')
    {
        echo registerUser($_POST['uUId'], $_POST['username'], $_POST['password'], $_POST['confirmPassword'], $_POST['email']);

        exit();
    }

    include_once 'view/register.php';
}
else
{
    header('Location: index.php?type=game');
}