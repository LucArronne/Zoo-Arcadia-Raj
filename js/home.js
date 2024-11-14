
const requestOptions = {
    method: 'GET',  
    headers: { 
        'Content-Type': 'application/json' 
   
    }
};




let services = [];
let currentIndex = 0;
let isFetching = false;

// Fonction pour récupérer les services une seule fois et les stocker dans un tableau
function fetchServices() {
    if (isFetching) return;
    isFetching = true;

    fetch(`${apiUrl}home/services`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            return response.json();
        })
        .then(data => {
            services = shuffleArray(data); // Mélange les services
            isFetching = false;
            loadServicesSequentially(); // Commence à afficher les services un par un
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des services:', error);
            document.getElementById('service-list-home').innerHTML = '<div class="alert alert-danger">Erreur lors de la récupération des services</div>';
            isFetching = false;
        });
}

// Fonction pour mélanger les services
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fonction pour afficher les services un par un avec un délai de 2 secondes
function loadServicesSequentially() {
    const serviceContainer = document.getElementById('service-list-home');

    // Fonction pour afficher le prochain service
    const loadNextService = () => {
        if (currentIndex >= services.length) {
            currentIndex = 0; // Réinitialiser l'index pour recommencer à partir du début
        }

        const service = services[currentIndex];
        const serviceCard = `
            <article class="service-card">
                <img src="${service.image}" alt="${service.name}">
                <h3 class="overlay-text-container text-white">${service.name}</h3>
                <p>${service.description}</p>
            </article>
        `;

        // Afficher le service dans le conteneur
        serviceContainer.innerHTML = serviceCard;

        // Passer au service suivant
        currentIndex++;
    };

    // Afficher un service toutes les 2 secondes
    setInterval(loadNextService, 2000);
}

// Charger les services lors du démarrage de la page
window.onload = fetchServices;