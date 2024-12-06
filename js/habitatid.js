const requestOptions = {
    method: "GET",
    redirect: "follow",
};

document.addEventListener('DOMContentLoaded', function() {
    const habitatList = document.getElementById('habitat-list');
    const animalsList = document.getElementById('animals-list');

    // Afficher les habitats
    fetch(apiUrl + "home/habitats", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            habitatList.innerHTML = ''; 

            if (!data || !Array.isArray(data)) {
                throw new Error('Data format incorrect: expecting an array');
            }

            data.forEach(habitat => {
                const imageUrl = habitat.images.length > 0 ? habitat.images[0].path : 'default-image.jpg';

                const habitatCard = document.createElement('article');
                habitatCard.classList.add('habitat-card');

                habitatCard.innerHTML = `
                    <img src="${imageUrl}" alt="Habitat de la ${habitat.name}">
                    <h3 class="overlay-text-container text-white">${habitat.name}</h3>
                    <p>${habitat.description}</p>
                    <a href="#" class="btn btn-secondary" data-id="${habitat.id}">Voir les Détails</a>
                `;

                habitatList.appendChild(habitatCard);
            });

            // Ajouter des écouteurs d'événements pour les boutons "Voir les Détails"
            document.querySelectorAll('.btn-secondary').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault(); // Empêche le comportement par défaut du lien
                    const habitatId = this.getAttribute('data-id');
                    fetchHabitatDetails(habitatId);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching habitats:', error);
            habitatList.innerHTML = '<p>Erreur de chargement des habitats.</p>';
        });

    // Fonction pour afficher les détails de l'habitat et les animaux associés
    function fetchHabitatDetails(habitatId) {
        fetch(`https://127.0.0.1:8000/api/home/habitats/${habitatId}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const habitatDetails = document.getElementById('habitat-details');

                if (!habitatDetails || !animalsList) {
                    throw new Error('Élément avec l\'ID "habitat-details" ou "animals-list" non trouvé.');
                }

                // Afficher les détails de l'habitat
                habitatDetails.innerHTML = `
                    <h3>${data.name}</h3>
                    <p>Description : ${data.description}</p>
                    <img src="${data.images.length > 0 ? data.images[0].path : 'default-image.jpg'}" alt="Image de l'habitat">
                `;

                // Afficher les animaux de l'habitat
                animalsList.innerHTML = ''; 

                if (!data.animals || !Array.isArray(data.animals)) {
                    throw new Error('Format de données incorrect : tableau attendu pour les animaux');
                }

                data.animals.forEach(animal => {
                    const imageUrl = animal.images.length > 0 ? animal.images[0].path : 'default-image.jpg';

                    const animalCard = document.createElement('article');
                    animalCard.classList.add('habitat-card');
                    animalCard.innerHTML = `
                        <img src="${imageUrl}" alt="Image de ${animal.name}">
                        <h3 class="overlay-text-container text-white">${animal.name}</h3>
                        <p>Race : ${animal.race.name}</p>
                        <a href="#" class="btn btn-secondary" data-id="${animal.id}">Voir les Détails</a>
                    `;

                    animalsList.appendChild(animalCard);
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations de l\'habitat :', error);
                habitatDetails.innerHTML = '<p>Erreur de chargement des détails de l\'habitat.</p>';
                animalsList.innerHTML = '<p>Erreur de chargement des animaux.</p>';
            });
    }
});
