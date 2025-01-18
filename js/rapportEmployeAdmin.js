function getToken() {
    // Cette fonction peut être adaptée en fonction de la manière dont vous gérez votre token (par exemple, depuis localStorage, sessionStorage ou un cookie)
    return localStorage.getItem('accessToken');  // Remplacez par votre méthode de récupération du token
}

// Déclaration des options d'en-tête avec le Bearer Token
const accessToken = getToken(); // Fonction pour récupérer le token d'accès
const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + accessToken);

// Fonction pour récupérer les statistiques des visites
async function getVisitStatistics() {
    try {
        const response = await fetch('https://127.0.0.1:8000/api/statistics/visits', {
            method: 'GET',
            headers: myHeaders,  // Ajouter l'en-tête d'autorisation avec le token
            redirect: 'follow'
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        
        console.log('Statistiques des visites:', data);

        // Affichage des statistiques des visites, à personnaliser selon la structure des données retournées
        const visitStatsContainer = document.getElementById('visit-stats-container');
        if (visitStatsContainer) {
            visitStatsContainer.innerHTML = `
                <h3>Statistiques des Visites</h3>
                <ul>
                    <li>Nombre de visites : ${data.visitsCount}</li>
                    <li>Nombre d'animaux consultés : ${data.animalVisits}</li>
                    <li>Nombre d'habitats consultés : ${data.habitatVisits}</li>
                </ul>
            `;
        }

    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques de visites :', error);
        const visitStatsContainer = document.getElementById('visit-stats-container');
        if (visitStatsContainer) {
            visitStatsContainer.innerHTML = '<p>Erreur de chargement des statistiques.</p>';
        }
    }
}

// Initialiser l'affichage des statistiques des visites
getVisitStatistics();