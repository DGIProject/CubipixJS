<?php
function registerUser($username, $password, $email)
{
    if($username != '' && strlen($username ) > 4 && $password != '' && $email != '')
    {
        global $bdd;

        $req = $bdd->prepare('INSERT INTO users (username, password, email) VALUES (:username, :password, :email)');

        if($req->execute(array($username, sha1($password), $email)))
        {
            return 'true';
        }
        else
        {
            return 'false';
        }
    }
    else
    {
        return 'false';
    }
}