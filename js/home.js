// Récupérer les services 
const requestOptions = {
    method: 'GET',  
    headers: { 
        'Content-Type': 'application/json' 
   
    }
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
        habitatList.innerHTML = ''; 

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
            currentIndex = 0; 
        }

        const service = services[currentIndex];
        const serviceCard = `
            <article class="service-card">
                <img src="${service.image}" alt="${service.name}">
                <h3 class="overlay-text-container text-white">${service.name}</h3>
                <p>${service.description}</p>
            </article>
        `;

        // Affiche le service dans le conteneur
        serviceContainer.innerHTML = serviceCard;

        // Passer au service suivant
        currentIndex++;
    };

    // Affiche un service toutes les 2 secondes
    setInterval(loadNextService, 2000);
}

// Charger les services lors du démarrage de la page
window.onload = fetchServices;




//Avis des Client(e)s

let currentPage = 1;
const itemsPerPage = 3;

fetch(`${apiUrl}home/comments`, requestOptions)
    .then(response => {
        console.log('Response Status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(avis => {
        console.log('API Result:', avis);
        const avisPage = document.getElementById('avisPage');
        avisPage.innerHTML = ''; // Clear the loading text

        // Fonction pour afficher les avis de la page actuelle
        function renderPage(page) {
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const avisToDisplay = avis.slice(start, end);

            avisPage.innerHTML = ''; // Clear the current content

            avisToDisplay.forEach(avisItem => {
                if (avisItem.visible) {
                    const avisCard = `
                        <div class="col-md-4">
                            <div class="card mb-4 shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title">${avisItem.pseudo}</h5>
                                    <p class="card-text">${avisItem.text}</p>
                                    <p class="text-muted">${new Date(avisItem.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    avisPage.innerHTML += avisCard;
                }
            });

            // Afficher ou masquer le bouton "Next"
            if (end < avis.length) {
                const nextButton = document.createElement('button');
                nextButton.textContent = 'Voir plus d\'avis';
                nextButton.className = 'btn btn-primary mt-4';
                nextButton.addEventListener('click', () => {
                    currentPage++;
                    renderPage(currentPage); // Afficher la page suivante
                });
                avisPage.appendChild(nextButton);
            }
        }

        renderPage(currentPage); // Afficher la première page d'avis

    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('avisPage').innerHTML = '<div class="alert alert-danger">Erreur lors de la récupération des avis</div>';
    });




    //Laisser un avis 
    document.getElementById('reviewForm').addEventListener('submit', function (event) {
        event.preventDefault();
    
        const username = document.getElementById('username').value;
        const rating = document.getElementById('rating').value;
        const review = document.getElementById('review').value;
    
        const apiUrl = 'https://127.0.0.1:8000/api/';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pseudo: username,
                text: review,
                rating: rating
            }),
        };
    
        fetch(`${apiUrl}home/comments`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau');
                }
                return response.json();
            })
            .then(data => {
                // Afficher un message de confirmation
                const confirmationMessage = document.createElement('div');
                confirmationMessage.className = 'alert alert-success mt-3';
                confirmationMessage.textContent = 'Merci pour votre avis !';
                document.getElementById('reviewForm').appendChild(confirmationMessage);
    
                // Réinitialiser le formulaire
                document.getElementById('reviewForm').reset();
    
                // Masquer le message d'erreur s'il était affiché
                document.getElementById('error-message').style.display = 'none';
    
                console.log('Success:', data);
            })
            .catch((error) => {
                // Afficher le message d'erreur
                document.getElementById('error-message').style.display = 'block';
                console.error('Error:', error);
            });
    });
    