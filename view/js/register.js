function registerPlayer(username, password, confirmPassword, email)
{
    console.log('registerPlayer');

    document.getElementById('buttonRegisterPlayer').setAttribute('disabled', '');

    if(username != '' && password != '' && confirmPassword != '')
    {
        if(username.length > 4)
        {
            if(password.length > 4)
            {
                if(password == confirmPassword)
                {
                    var OAjax;

                    if (window.XMLHttpRequest) OAjax = new XMLHttpRequest();
                    else if (window.ActiveXObject) OAjax = new ActiveXObject('Microsoft.XMLHTTP');
                    OAjax.open('POST', 'index.php?type=register&a=register', true);
                    OAjax.onreadystatechange = function()
                    {
                        if (OAjax.readyState == 4 && OAjax.status == 200)
                        {
                            console.log(OAjax.responseText);

                            if(OAjax.responseText == 'true')
                            {
                                location.href = 'index.php?type=game';
                            }
                            else
                            {
                                document.getElementById('buttonRegisterPlayer').removeAttribute('disabled');

                                var n = noty({text: 'Error, unable to register.', layout: 'topRight', type: 'error'});
                            }
                        }
                    }

                    OAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
                    OAjax.send('uUId=' + getUId() + '&username=' + username + '&password=' + password + '&confirmPassword=' + confirmPassword + '&email=' + email);
                }
                else
                {
                    document.getElementById('buttonRegisterPlayer').removeAttribute('disabled');

                    var n = noty({text: 'Passwords are not the same.', layout: 'topRight', type: 'error'});
                }
            }
            else
            {
                document.getElementById('buttonRegisterPlayer').removeAttribute('disabled');

                var n = noty({text: 'Password need to have more than 4 characters.', layout: 'topRight', type: 'error'});
            }
        }
        else
        {
            document.getElementById('buttonRegisterPlayer').removeAttribute('disabled');

            var n = noty({text: 'Username need to have more than 4 characters.', layout: 'topRight', type: 'error'});
        }
    }
    else
    {
        document.getElementById('buttonRegisterPlayer').removeAttribute('disabled');

        var n = noty({text: 'All of fields need to be fill out.', layout: 'topRight', type: 'error'});
    }
}

function s4()
{
    return Math.floor((1 + Math.random()) * 0x10000) . toString(16) . substring(1);
}

function getUId()
{
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}