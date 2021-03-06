<?php
function loginGame($username, $password)
{
    if($username != '' && $password != '')
    {
        global $bdd;

        $req = $bdd->prepare('SELECT COUNT(*) AS goodLogin, id, uUId FROM users WHERE username = ? AND password = ?');
        $req->execute(array($username, sha1($password)));

        $return = $req->fetch();

        if($return['goodLogin'] > 0)
        {
            $_SESSION['user'] = $username;
            $_SESSION['userId'] = $return['id'];
            $_SESSION['uUId'] = $return['uUId'];

            return 'true';
        }
        else
        {
            return 'false';
        }
    }
    else
    {
        return 'false1';
    }
}