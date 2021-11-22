'use strict';

function sign_up() {
    let userName = document.getElementById("username").value;
    if (checkPassword()) {
        let userPass = document.getElementById("password").value;
        let fetchResponse = fetch('/users/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: userName, password: userPass})
        });

        fetchResponse.then((response) => response.json()).then(response => {
            let promptArea = document.getElementById("passwordError");
            if (response.code === '1') {
                alert("注册成功，2秒后自动跳转");
                window.setTimeout("window.location='/'", 2000);
            } else if (response.code === '-1') {
                promptArea.innerText = "用户名已经存在";
                promptArea.style.display = 'inline-block';
                document.getElementById("password").value = '';
                document.getElementById("repeat-password").value = '';
                document.getElementById("username").value = '';
            } else if (response.code === '-2') {
                promptArea.innerText = "用户名太短";
                promptArea.style.display = 'inline-block';
                document.getElementById("password").value = '';
                document.getElementById("repeat-password").value = '';
                document.getElementById("username").value = '';
            } else if (response.code === '-3') {
                promptArea.innerText = "密码长度应为6-20位";
                promptArea.style.display = 'inline-block';
                document.getElementById("password").value = '';
                document.getElementById("repeat-password").value = '';
            }
        });
    }
}

/*********************************************************
 ***************        密码校验       ********************
 *********************************************************/
function checkPassword() {
    let promptArea = document.getElementById("passwordError");
    let rePasswordArea = document.getElementById("repeat-password");

    let passwordValue = document.getElementById("password").value;
    let rePasswordValue = document.getElementById("repeat-password").value;

    if (passwordValue.length<6||passwordValue.length>20) {
        promptArea.innerText = "密码长度应为6-20位";
        promptArea.style.display = 'inline-block';
        document.getElementById("password").value = "";
        rePasswordArea.value = "";
        return false;
    }

    if (rePasswordValue === "" || passwordValue !== rePasswordValue) {
        promptArea.innerText = "输入的密码不一致";
        promptArea.style.display = 'inline-block';
        rePasswordArea.value = "";
        return false;
    }
    promptArea.style.display = 'none';
    return true;
}

