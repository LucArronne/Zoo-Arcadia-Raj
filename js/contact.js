// Gestion de la soumission du formulaire de contact
$('#contactForm').on('submit', function (event) {
    event.preventDefault(); // Empêche l'envoi normal du formulaire

    const name = $('#name').val();
    const email = $('#email').val();
    const subject = $('#subject').val();
    const message = $('#message').val();

    // Logique pour envoyer les données à un serveur
    // Cette partie serait normalement gérée par une API
    if (name && email && subject && message) {
        // Simuler l'envoi du message
        $('#confirmation-message').text("Votre message a été envoyé avec succès !").show();
        $('#error-message').hide();

        // Réinitialiser le formulaire
        $('#contactForm')[0].reset();
    } else {
        $('#error-message').text("Veuillez remplir tous les champs.").show();
        $('#confirmation-message').hide();
    }
});