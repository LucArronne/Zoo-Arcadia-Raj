const tokenCookieName = "accesstoken";
const apiUrl = "https://localhost:8000/api/";

function setToken(token) {
    setCookie(tokenCookieName, token, 1);
}

function getToken() {
    return getCookie(tokenCookieName);
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function isConnected() {
    if (getToken() == null || getToken == undefined) {
        return false;
    }
    else {
        return true;
    }
}

function getRoleInToken(token) {
    // Diviser jwt en 3 parties(header, payload, signature)
    const parts = token.split('.');

    // Décoder la charge utile (second part of the token)
    const payload = parts[1];

    // Decode from Base64 URL encoding to Base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

    // Decode the Base64 string to a UTF-8 string
    const decoded = JSON.parse(atob(base64));

    return decoded.roles[0];
}

function redirectPageByRole(role) {
    switch (role) {
        case "ROLE_ADMIN":
            window.location.href = "/gestionuser";
            break;
        case "ROLE_EMPLOYEE":
            window.location.href = "/user2";
            break
        case "ROLE_VETERNARY":
            window.location.href = "/veterinaire";
            break;
        default:
            alert("Rôle non autorisé.");
            break;
    }
}

if (isConnected()) {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logOutBtn").style.display = "block";
    document.getElementById("logOutBtn").addEventListener("click", function (event) {
        event.preventDefault();
        eraseCookie(tokenCookieName);
        window.location.replace("/");
    });
}
else {
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("logOutBtn").style.display = "none";
}