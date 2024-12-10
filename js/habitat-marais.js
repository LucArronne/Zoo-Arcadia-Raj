const habitatId = 12;  // ID de l'habitat


const requestOptions = {
    method: "GET",
    redirect: "follow",
};

console.log(`Appel API pour l'habitat avec l'ID : ${habitatId}`);

// Utilisation des backticks pour interpoler l'ID de l'habitat dans l'URL
fetch(`${apiUrl}home/habitats/${habitatId}`, requestOptions)
    .then(response => {
        console.log('Réponse de l\'API reçue');
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Données de l\'habitat reçues:', data);

        const animalsList = document.getElementById('animal-list');
        if (!animalsList) {
            throw new Error('Élément avec l\'ID "animal-list" non trouvé.');
        }
        animalsList.innerHTML = '';  // Réinitialiser la liste avant d'ajouter les animaux

        if (!data || !data.animals || !Array.isArray(data.animals)) {
            throw new Error('Format de données incorrect : tableau des animaux attendu');
        }

        // Affichage du nom et de la description de l'habitat
        const habitatName = document.getElementById('habitat-name');
        const habitatDescription = document.getElementById('habitat-description');
        
        if (habitatName) habitatName.textContent = data.name;
        if (habitatDescription) habitatDescription.textContent = data.description;

        // Parcourir la liste des animaux de l'habitat
        data.animals.forEach(animal => {
            const imageUrl = animal.images.length > 0 ? animal.images[0].path : 'default-image.jpg';

            const animalCard = document.createElement('article');
            animalCard.classList.add('habitat-card');
            animalCard.innerHTML = `
                <img src="${imageUrl}" alt="Image de ${animal.name}">
                <h3 class="overlay-text-container text-white">${animal.name}</h3>
                <p>Race : ${animal.race.name}</p>
                <a href="animal_details.html?habitatId=${habitatId}&animalId=${animal.id}" class="btn btn-secondary">Voir les Détails</a>
            `;

            animalsList.appendChild(animalCard);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des animaux :', error);
        const animalsList = document.getElementById('animal-list');
        if (animalsList) {
            animalsList.innerHTML = '<p>Erreur de chargement des animaux.</p>';
        }
    });
