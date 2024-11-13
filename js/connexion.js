const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");

document.getElementById('loginForm').addEventListener('submit', checkCredentials);

async function checkCredentials(event) {
    event.preventDefault();

    // Création des en-têtes
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Préparation du corps de la requête avec les identifiants
    const raw = JSON.stringify({
        "username": mailInput.value,
        "password": passwordInput.value
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "manual", // Gère manuellement les redirections pour inspection
        credentials: "include"
    };

    try {
        const response = await fetch("https://localhost:8000/api/login", requestOptions);

        if (!response.ok) {
            throw new Error("Identifiants incorrects");
        }

        const data = await response.json();

        const token = data.token;

        setToken(token);

        const role = getRoleInToken(token);

        redirectPageByRole(role);

    } catch (error) {
        alert(error.message);
    }
}
function redirectPageByRole(role) {
    // Redirige l'utilisateur selon son rôle
    switch (role) {
        case "ROLE_ADMIN":
            window.location.href = "/gestionuser";
            break;
        case "ROLE_EMPLOYEE":
            window.location.href = "/avis";
            break;
        case "ROLE_VETERNARY":
            window.location.href = "/veterinaire";
            break;
        default:
            alert("Rôle non autorisé.");
            break;
    }
}