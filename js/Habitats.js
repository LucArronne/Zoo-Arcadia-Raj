
const requestOptions = { method: "GET", redirect: "follow" };

// Fonction pour récupérer la liste des habitats
function fetchHabitats() {
    fetch(apiUrl + "home/habitats", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const habitatList = document.getElementById('habitat-list');
            if (!habitatList) {
                throw new Error('Élément avec l\'ID "habitat-list" non trouvé.');
            }
            habitatList.innerHTML = '';  // Réinitialiser la liste avant d'ajouter les habitats

            if (!data || !Array.isArray(data)) {
                throw new Error('Format de données incorrect : tableau des habitats attendu');
            }

            // Parcourir la liste des habitats
            data.forEach(habitat => {
                const imageUrl = habitat.images && habitat.images.length > 0 ? habitat.images[0].path : 'default-habitat.jpg';

                const habitatCard = document.createElement('article');
                habitatCard.classList.add('habitat-card');
                habitatCard.innerHTML = `
                    <div class="habitat-card-content">
                        <img src="${imageUrl}" alt="Image de l'habitat ${habitat.name}" class="habitat-image">
                        <h3 class="habitat-name">${habitat.name}</h3>
                        <p class="habitat-description">${habitat.description}</p>
                        <a href="#" class="btn btn-primary" onclick="fetchHabitatDetails(${habitat.id})">En savoir plus</a>
                    </div>
                `;
                habitatList.appendChild(habitatCard);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des habitats :', error);
            const habitatList = document.getElementById('habitat-list');
            if (habitatList) {
                habitatList.innerHTML = '<p>Erreur de chargement des habitats.</p>';
            }
        });
}

// Fonction pour récupérer les détails d'un habitat
function fetchHabitatDetails(habitatId) {
    console.log(`Appel API pour l'habitat avec l'ID : ${habitatId}`);
    fetch(`${apiUrl}home/habitats/${habitatId}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Données de l\'habitat reçues:', data);

            const habitatName = document.getElementById('habitat-name');
            const habitatDescription = document.getElementById('habitat-description');
            const animalsList = document.getElementById('animal-list');
            const habitatList = document.getElementById('habitat-list');
            const habitatDetails = document.getElementById('habitat-details');

            if (!animalsList) {
                throw new Error('Élément avec l\'ID "animal-list" non trouvé.');
            }

            // Réinitialiser la liste des animaux avant d'ajouter
            animalsList.innerHTML = '';

            // Affichage du nom et de la description de l'habitat
            if (habitatName) habitatName.textContent = data.name;
            if (habitatDescription) habitatDescription.textContent = data.description;

            if (!data.animals || !Array.isArray(data.animals)) {
                throw new Error('Format de données incorrect : tableau des animaux attendu');
            }

            // Parcourir la liste des animaux de l'habitat
            data.animals.forEach(animal => {
                const imageUrl = animal.images.length > 0 ? animal.images[0].path : 'default-image.jpg';

                const animalCard = document.createElement('article');
                animalCard.classList.add('habitat-card');
                animalCard.innerHTML = `
                    <img src="${imageUrl}" alt="Image de ${animal.name}">
                    <h3 class="overlay-text-container text-white">${animal.name}</h3>
                    <p>Race : ${animal.race.name}</p>
                  
                `;
                animalsList.appendChild(animalCard);
            });

            // Afficher les détails de l'habitat et cacher la liste des habitats
            habitatList.style.display = 'none';
            habitatDetails.style.display = 'block';
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des animaux :', error);
            const animalsList = document.getElementById('animal-list');
            if (animalsList) {
                animalsList.innerHTML = '<p>Erreur de chargement des animaux.</p>';
            }
        });
}

// Initialiser l'affichage de la liste des habitats
fetchHabitats();