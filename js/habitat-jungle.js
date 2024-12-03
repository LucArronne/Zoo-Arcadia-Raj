
const requestOptions = {
    method: "GET",
    redirect: "follow",
};


    fetch(apiUrl + "home/animals", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const animalsList = document.getElementById('animal-list');
            if (!animalsList) {
                throw new Error('Élément avec l\'ID "animal-list" non trouvé.');
            }
            animalsList.innerHTML = ''; 

            if (!data || !Array.isArray(data)) {
                throw new Error('Format de données incorrect : tableau attendu');
            }

            data.forEach(animal => {
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
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des animaux :', error);
            const animalsList = document.getElementById('animal-list');
            if (animalsList) {
                animalsList.innerHTML = '<p>Erreur de chargement des animaux.</p>';
            }
        });

