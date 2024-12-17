async function getAnimalDetails(id) {
    try {
        // Appel à l'API pour récupérer les détails de l'animal
        const response = await fetch(`/api/home/animals/last-rapport/${id}`);
        
        if (!response.ok) {
            throw new Error(`Erreur : ${response.status}`);
        }

        const data = await response.json();

        // Mise à jour du DOM avec les données récupérées
        displayAnimalDetails(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'animal :', error);

        const detailsContainer = document.getElementById('animal-details');
        if (detailsContainer) {
            detailsContainer.innerHTML = `<p class="text-danger">Impossible de récupérer les détails. Veuillez réessayer plus tard.</p>`;
        }
    }
}

function displayAnimalDetails(data) {
    // Sélectionne l'élément où afficher les détails
    const detailsContainer = document.getElementById('animal-details');

    if (detailsContainer) {
        detailsContainer.innerHTML = `
            <p><strong>État :</strong> ${data.state}</p>
            <p><strong>Nourriture :</strong> ${data.food}</p>
            <p><strong>Quantité :</strong> ${data.quantity}</p>
            <p><strong>Date :</strong> ${new Date(data.date).toLocaleString()}</p>
            <p><strong>Détails :</strong> ${data.details}</p>
        `;
    }
}
