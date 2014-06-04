function loginGame(username, password)
{
    console.log('loginGame');

    document.getElementById('buttonLoginGame').setAttribute('disabled', '');

    if(username != '' && password != '')
    {
        var OAjax;

        if (window.XMLHttpRequest) OAjax = new XMLHttpRequest();
        else if (window.ActiveXObject) OAjax = new ActiveXObject('Microsoft.XMLHTTP');
        OAjax.open('POST', 'index.php?type=game&a=login', true);
        OAjax.onreadystatechange = function()
        {
            if (OAjax.readyState == 4 && OAjax.status == 200)
            {
                console.log(OAjax.responseText);

                if(OAjax.responseText == 'true')
                {
                    location.reload();
                }
                else
                {
                    document.getElementById('buttonLoginGame').removeAttribute('disabled');

                    var n = noty({text: 'Wrong username or password.', layout: 'topRight', type: 'error'});
                }
            }
        }

        OAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        OAjax.send('username=' + username + '&password=' + password);
    }
    else
    {
        document.getElementById('buttonLoginGame').removeAttribute('disabled');

        var n = noty({text: 'Two fields need to be fill out.', layout: 'topRight', type: 'error'});
    }
}