document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pseudo: name,
            text: message
        }),
    };

    fetch(apiUrl + , requestOptions)// je dois mettre un API correspendant***********************
        .then(response => response.json())
        .then(data => {
            // Afficher un message de confirmation
            const confirmationMessage = document.getElementById('confirmation-message');
            confirmationMessage.textContent = 'Votre commentaire a bien été envoyé ! Merci pour votre message.';
            confirmationMessage.style.display = 'block';

            // Masquer tout message d'erreur
            document.getElementById('error-message').style.display = 'none';

            // Réinitialiser le formulaire après succès
            document.getElementById('contactForm').reset();

            console.log('Success:', data);
        })
        .catch((error) => {
            // Afficher un message d'erreur
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
            errorMessage.style.display = 'block';

            // Masquer le message de confirmation
            document.getElementById('confirmation-message').style.display = 'none';

            console.error('Error:', error);
        });
});
