const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");

document.getElementById('loginForm').addEventListener('submit', checkCredentials);

async function checkCredentials(event) {
    event.preventDefault();

    // Création des en-têtes
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    
    const raw = JSON.stringify({
        "username": mailInput.value,
        "password": passwordInput.value
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "manual", // Gère manuellement les redirections 
        credentials: "include"
    };

    try {
        const response = await fetch(apiUrl + "login", requestOptions);

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
