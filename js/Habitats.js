const requestOptions = {
    method: "GET",
    redirect: "follow",
};

fetch(apiUrl + "home/habitats", requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const habitatList = document.getElementById('habitat-list');
        habitatList.innerHTML = ''; // Assurez-vous que le conteneur est vide avant d'ajouter les cartes.

        if (!data || !Array.isArray(data)) {
            throw new Error('Data format incorrect: expecting an array');
        }

        data.forEach(habitat => {
            // Vérifiez si une image est disponible
            const imageUrl = habitat.images.length > 0 ? habitat.images[0].path : 'default-image.jpg';

            const habitatCard = document.createElement('article');
            habitatCard.classList.add('habitat-card');

            habitatCard.innerHTML = `
                <img src="${imageUrl}" alt="Habitat de la ${habitat.name}">
                <h3 class="overlay-text-container text-white">${habitat.name}</h3>
                <p>${habitat.description}</p>
                <a href="/habitat/${habitat.id}" class="btn btn-secondary">Voir les Détails</a>
            `;

            habitatList.appendChild(habitatCard);
        });
    })
    .catch(error => {
        console.error('Error fetching habitats:', error);
        const habitatList = document.getElementById('habitat-list');
        habitatList.innerHTML = '<p>Erreur de chargement des habitats.</p>';
    });
