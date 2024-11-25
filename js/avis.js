  // Gestion de la soumission du formulaire
  $('#reviewForm').on('submit', function (event) {
    event.preventDefault();
    // Récupérer les données du formulaire
    const username = $('#username').val();
    const rating = $('#rating').val();
    const review = $('#review').val();

    // Simulation de soumission d'avis
    console.log("Nom :", username);
    console.log("Note :", rating);
    console.log("Avis :", review);
    alert('Votre avis a été soumis avec succès . Merci !');
    $(this).trigger('reset'); // Réinitialiser le formulaire
});

