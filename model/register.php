<?php
function registerUser($usernameUId, $username, $password, $confirmPassword, $email)
{
    if($usernameUId != '' && $username != '' && strlen($username) > 4 && strlen($password) > 4 && $password != '' && $password == $confirmPassword)
    {
        global $bdd;

        $req = $bdd->prepare('SELECT COUNT(*) AS existUsername FROM users WHERE username = ?');
        $req->execute(array($username));

        $return = $req->fetch();

        if($return['existUsername'] <= 0)
        {
            $req = $bdd->prepare('INSERT INTO users (uUId, username, password, email) VALUES (:uUId, :username, :password, :email)');

            if($req->execute(array('uUId' => $usernameUId, 'username' => $username, 'password' => sha1($password), 'email' => (($email != '') ? $email : NULL))))
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
    else
    {
        return 'false';
    }
}