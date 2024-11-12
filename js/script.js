const tokenCookieName = "accesstoken";

function setToken(token) {
    setCookie(tokenCookieName, token, 1);
}

function getToken() {
    return getCookie(tokenCookieName);
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
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
    // Split the JWT into its three parts (header, payload, signature)
    const parts = token.split('.');

    // Decode the payload (second part of the token)
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
            window.location.replace("/gestionuser");
            break;
        case "ROLE_EMPLOYE":
            window.location.replace("/user2");
            break;
        case "ROLE_VETERNARY":
            window.location.replace("/veterinaire");
            break;
        default:
            window.location.replace("/");
    }
}