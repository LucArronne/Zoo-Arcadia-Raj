const tokenCookieName = "accesstoken";
const apiUrl = "https://zoo-api-b76772f1a36b.herokuapp.com/api/";

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
    if (!token) {
        return null;
    }
    try {
        const parts = token.split('.');
        const payload = parts[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(base64));
        return decoded.roles ? decoded.roles[0] : null;  // Vérification si 'roles' existe
    } catch (e) {
        console.error("Erreur lors de la récupération du rôle depuis le token:", e);
        return null;
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
        toggleMenuItem("statMenu", role === "ROLE_ADMIN");
        toggleMenuItem("comtRendu", role === "ROLE_ADMIN");
        toggleMenuItem("rappotEmploye", role === "ROLE_ADMIN");
        toggleMenuItem("avisEmploye", role === "ROLE_EMPLOYEE");
        toggleMenuItem("alimentMenu", role === "ROLE_EMPLOYEE");
        toggleMenuItem("vetMenu", role === "ROLE_VETERINARY");

        // Masquer les pages publiques (Accueil, Services, Habitats, Contact) si l'utilisateur est connecté avec un rôle spécifique
        toggleMenuItem("home", false);
        toggleMenuItem("service", false);
        toggleMenuItem("habitats", false);
        toggleMenuItem("contact", false);

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
        toggleMenuItem("comtRendu", false);
        toggleMenuItem("employeeMenu", false);
        toggleMenuItem("vetMenu", false);
        toggleMenuItem("statMenu", false);
        toggleMenuItem("rappotEmploye", false);

        // Afficher les pages publiques (Accueil, Services, Habitats, Contact)
        toggleMenuItem("home", true);
        toggleMenuItem("service", true);
        toggleMenuItem("habitats", true);
        toggleMenuItem("contact", true);
    }
}

// Fonction pour rediriger l'utilisateur en fonction de son rôle
function redirectPageByRole(role) {
    const currentPath = window.location.pathname;
    switch (role) {
        case "ROLE_ADMIN":
            // Si l'utilisateur n'est pas déjà sur une page admin (statistiques ou gestion des utilisateurs)
            if (currentPath !== "/statistiques" && currentPath !== "/gestionuser" &&  currentPath !== "/compteRendu"  &&  currentPath !== "/rapportEmployeAdmin") {
                // Redirection vers la page de statistiques si ce n'est pas déjà la page en cours
                window.location.href = "/statistiques";
            }
            break;
        case "ROLE_EMPLOYEE":
            if (currentPath !== "/user2"  && currentPath !== "/alimentEmploye") {
                window.location.href = "/user2";
            }
            break;
        case "ROLE_VETERNARY":
            if (currentPath !== "/veterinaire") {
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

// Appel de la fonction de mise à jour du menu lors du chargement de la page
document.addEventListener("DOMContentLoaded", updateMenu);
