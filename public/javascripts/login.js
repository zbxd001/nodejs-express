'use strict';

function login() {
    let userName = document.getElementById("username").value;
    let userPass = document.getElementById("password").value;
    let salt = document.getElementById("salt").innerText;

    if (userName && checkStrong(userPass)) {
        userPass = userPass + salt;
        userPass = window.btoa(userPass);
        let fetchResponse = fetch('/users/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: userName, password: userPass})
        });


        fetchResponse.then((response) => response.json()).then(response => {
            if (response.code === '1') {
                console.log("here");
                window.location = '/main';
            } else {
                alert("用户名或者密码错误");
                location.reload();
            }
        });
        return true;
    }
    alert("用户名或者密码错误!");
    location.reload();
    return false;
}


