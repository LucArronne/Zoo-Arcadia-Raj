const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnValidation = document.getElementById("btn-validation");

btnValidation.addEventListener("click", checkCredentials);

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

        // Split the JWT into its three parts (header, payload, signature)
        const parts = token.split('.');

        // Decode the payload (second part of the token)
        const payload = parts[1];

        // Decode from Base64 URL encoding to Base64
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

        // Decode the Base64 string to a UTF-8 string
        const decoded = JSON.parse(atob(base64));

        switch (decoded.roles[0]) {
            case "ROLE_ADMIN":
                window.location.replace("/gestionuser");
                break;
            case "ROLE_EMPLOYE":
                window.location.replace("/user2");
                break;
            case "ROLE_VETERNARY":
                window.location.replace("/veterinaire");
                alert("Bienvenue");
                break;
            default:
                throw new Error("Rôle non reconnu");
        }
    } catch (error) {
        showError(error.message);
    }
}

function showError(message) {
    alert(message);
}

mailInput.addEventListener("input", () => mailInput.classList.remove("is-invalid"));
passwordInput.addEventListener("input", () => passwordInput.classList.remove("is-invalid"));