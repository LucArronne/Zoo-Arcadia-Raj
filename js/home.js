// URL de l'API (à remplacer par l'URL réelle de votre serveur)
const apiUrl = 'https://exemple.com/api/reviews';

// Fonction pour récupérer les avis existants
async function fetchReviews() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erreur de récupération des avis');
        }
        const reviews = await response.json();
        displayReviews(reviews);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Fonction pour afficher les avis sur la page
function displayReviews(reviews) {
    const reviewsContainer = document.querySelector('.avis .row');
    reviewsContainer.innerHTML = ''; // Effacer le contenu existant

    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('col-md-6', 'mb-4');
        reviewCard.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h3 class="card-title">${review.name}</h3>
                    <p class="card-text text-primary">"${review.text}"</p>
                </div>
            </div>
        `;
        reviewsContainer.appendChild(reviewCard);
    });
}

// Fonction pour envoyer un nouvel avis
async function submitReview() {
    const name = document.getElementById('username').value;
    const rating = document.getElementById('rating').value;
    const reviewText = document.getElementById('review').value;

    if (!name || !rating || !reviewText) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    const newReview = {
        name: name,
        rating: parseInt(rating),
        text: reviewText,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReview),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi de l\'avis');
        }

        const result = await response.json();
        alert('Avis soumis avec succès!');
        fetchReviews(); // Mettre à jour les avis
        resetForm();
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Fonction pour réinitialiser le formulaire après soumission
function resetForm() {
    document.getElementById('username').value = '';
    document.getElementById('rating').value = '';
    document.getElementById('review').value = '';
}

// Ajouter un écouteur d'événements pour le bouton de soumission
document.querySelector('#reviewForm button').addEventListener('click', submitReview);

// Charger les avis existants au chargement de la page
document.addEventListener('DOMContentLoaded', fetchReviews);
