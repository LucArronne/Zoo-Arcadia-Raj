// Stockage des utilisateurs avec leurs rôles (simulé côté client)
const users = [
    { email: "admin@zooarcadia.com", password: "admin123", role: "admin" },
    { email: "vet@zooarcadia.com", password: "vet123", role: "veterinaire" },
    { email: "employee@zooarcadia.com", password: "emp123", role: "employee" }
];

// Gestion de la soumission du formulaire de connexion
$('#loginForm').on('submit', function (event) {
    event.preventDefault(); // Empêche l'envoi normal du formulaire
    const email = $('#email').val();
    const password = $('#password').val();
    
    // Vérification des informations d'identification côté client
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Redirection en fonction du rôle de l'utilisateur
        if (user.role === "admin") {
            window.location.href = "admin-dashboard.html";
        } else if (user.role === "veterinarian") {
            window.location.href = "vet-dashboard.html";
        } else if (user.role === "employee") {
            window.location.href = "employee-dashboard.html";
        }
    } else {
        // Affichage d'un message d'erreur si l'utilisateur n'est pas trouvé
        $('#error-message').text("Identifiants invalides. Veuillez réessayer.").show();
    }
});
