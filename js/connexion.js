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
        redirect: "follow"
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/api/login", requestOptions, { mode: "no-cors" });

        if (!response.ok) {
            throw new Error("Identifiants incorrects");
        }

        const data = await response.json();

        if (data.success) {
            switch (data.role) {
                case "admin":
                    window.location.replace("/Pages/gestionuser.html");
                    break;
                case "employe":
                    window.location.replace("/Pages/user2.html");
                    break;
                case "veterinaire":
                    window.location.replace("/Pages/veterinaire.html");
                    alert("Bienvenue");
                    break;
                default:
                    throw new Error("Rôle non reconnu");
            }
        } else {
            showError("Identifiants incorrects");
        }
    } catch (error) {
        showError(error.message);
    }
}

function showError(message) {
    mailInput.classList.add("is-invalid");
    passwordInput.classList.add("is-invalid");
    alert(message);
}

mailInput.addEventListener("input", () => mailInput.classList.remove("is-invalid"));
passwordInput.addEventListener("input", () => passwordInput.classList.remove("is-invalid"));