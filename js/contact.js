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

    fetch(apiUrl + , requestOptions)
        .then(response => response.json())
        .then(data => {
          
            const confirmationMessage = document.getElementById('confirmation-message');
            confirmationMessage.textContent = 'Votre commentaire a bien été envoyé ! Merci pour votre message.';
            confirmationMessage.style.display = 'block';

          
            document.getElementById('error-message').style.display = 'none';

            // Réinitialiser le formulaire après succès
            document.getElementById('contactForm').reset();

            console.log('Success:', data);
        })
        .catch((error) => {
            
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
            errorMessage.style.display = 'block';

           
            document.getElementById('confirmation-message').style.display = 'none';

            console.error('Error:', error);
        });
});
