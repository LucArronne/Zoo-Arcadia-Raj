
const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const credentials = [
        { email: "Admin@mail.fr", password: "123", role: "admin" },
        { email: "Employé@mail.fr", password: "345", role: "employe" },
        { email: "Vétérinaire@mail.fr", password: "567", role: "veterinaire" }
    ];

    // Recherche si les identifiants sont valides et obtient le rôle
    const user = credentials.find(cred => 
        mailInput.value === cred.email && passwordInput.value === cred.password
    );

    if (user) {
        switch (user.role) {
            case "admin":
                // Redirige l'admin vers la page d'admin
                window.location.replace("/pages/gestionuser.html");
                break;
            case "employe":
                // Redirige l'employé vers la page Employé
                window.location.replace("/pages/employé.html");
                break;
            case "veterinaire":
                // Redirige le vétérinaire vers la page vétérianire
                window.location.replace("/pages/veterinaire.html");
        } 
    }
  
    else {
        // Affiche une erreur et ajoute la classe d'erreur sur les champs
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
        alert("Identifiants incorrects");
    }
}
