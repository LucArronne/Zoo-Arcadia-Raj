const requestOptions = {
    method: "GET",
    redirect: "follow"
};

// Appel à l'API avec la route "home/animals"
fetch(apiUrl + "home/animals", requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Données récupérées :", data);
        displayAnimals(data); // Appeler la fonction pour afficher les animaux
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
        const animalsList = document.getElementById("animals-list");
        animalsList.innerHTML = '<p>Erreur de chargement des animaux.</p>';
    });

// Fonction pour afficher les animaux
function displayAnimals(animals) {
    const animalsList = document.getElementById("animals-list");
    animalsList.innerHTML = ""; // Réinitialiser la liste

    animals.forEach(animal => {
        const animalCard = document.createElement("article");
        animalCard.classList.add("habitat-card");

        // Vérification si l'image est disponible
        const imageUrl = animal.images[0]?.path || "https://via.placeholder.com/150"; // Image par défaut si non disponible

        animalCard.innerHTML = `
            <img src="${imageUrl}" alt="${animal.name}">
            <h3 class="overlay-text-container text-primary">${animal.name}</h3>
            <div class="description">
                <p>Race : ${animal.race.name}</p>
                <p>Habitat : ${animal.habitat || "Inconnu"}</p> <!-- Ajoutez l'habitat si disponible -->
            </div>
        `;

        animalsList.appendChild(animalCard);
    });
}