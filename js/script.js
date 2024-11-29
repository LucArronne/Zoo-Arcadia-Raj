const tokenCookieName = "accesstoken";
const apiUrl = "https://localhost:8000/api/";

// Fonction pour définir un token dans le cookie
function setToken(token) {
    setCookie(tokenCookieName, token, 1);
}

// Fonction pour récupérer le token du cookie
function getToken() {
    return getCookie(tokenCookieName);
}

// Fonction pour définir un cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Fonction pour récupérer la valeur d'un cookie
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

// Fonction pour effacer un cookie
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// Vérification si l'utilisateur est connecté
function isConnected() {
    return getToken() !== null;
}

// Fonction pour extraire le rôle de l'utilisateur depuis le token
function getRoleInToken(token) {
    try {
        const parts = token.split('.');
        const payload = parts[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(base64));
        return decoded.roles[0];  // Exemple : 'ROLE_ADMIN', 'ROLE_EMPLOYEE', etc.
    } catch (e) {
        console.error("Erreur lors de la récupération du rôle depuis le token:", e);
        return null;  // Si le token est invalide ou malformé
    }
}

// Fonction générique pour afficher ou masquer les éléments du menu
function toggleMenuItem(menuId, shouldShow) {
    const menuItem = document.getElementById(menuId);
    if (menuItem) {
        menuItem.style.display = shouldShow ? "block" : "none";
    }
}

// Fonction pour mettre à jour l'affichage des menus en fonction de la connexion et du rôle
function updateMenu() {
    const token = getToken();
    const isLoggedIn = isConnected();
    let role = null;

    if (isLoggedIn) {
        role = getRoleInToken(token);  // On récupère le rôle du token

        // Mettre à jour les boutons de connexion/déconnexion
        toggleMenuItem("loginBtn", false);
        toggleMenuItem("logOutBtn", true);

        // Affichage des menus en fonction du rôle
        toggleMenuItem("adminMenu", role === "ROLE_ADMIN");
        toggleMenuItem("employeeMenu", role === "ROLE_EMPLOYEE");
        toggleMenuItem("vetMenu", role === "ROLE_VETERNARY");

        // Rediriger vers la page appropriée si l'utilisateur n'est pas sur la page d'accueil ou la page de connexion
        if (window.location.pathname === "/connexion" || window.location.pathname === "/") {
            // Rediriger l'utilisateur vers la page en fonction de son rôle si nécessaire
            redirectPageByRole(role);
        }

    } else {
        // Si non connecté, afficher seulement le bouton Connexion
        toggleMenuItem("loginBtn", true);
        toggleMenuItem("logOutBtn", false);

        // Masquer les menus spécifiques aux rôles
        toggleMenuItem("adminMenu", false);
        toggleMenuItem("employeeMenu", false);
        toggleMenuItem("vetMenu", false);
    }
}

// Fonction pour rediriger l'utilisateur en fonction de son rôle
function redirectPageByRole(role) {
    switch (role) {
        case "ROLE_ADMIN":
            if (window.location.pathname !== "/gestionuser") {
                window.location.href = "/gestionuser";
            }
            break;
        case "ROLE_EMPLOYEE":
            if (window.location.pathname !== "/user2") {
                window.location.href = "/user2";
            }
            break;
        case "ROLE_VETERNARY":
            if (window.location.pathname !== "/veterinaire") {
                window.location.href = "/veterinaire";
            }
            break;
        default:
            alert("Rôle non autorisé.");
            break;
    }
}

// Fonction pour se déconnecter
document.getElementById("logOutBtn")?.addEventListener("click", function () {
    eraseCookie(tokenCookieName);  // Supprimer le cookie du token
    window.location.replace("/");   // Rediriger vers la page d'accueil
});

// Initialiser l'affichage du menu lors du chargement de la page
window.onload = updateMenu;
