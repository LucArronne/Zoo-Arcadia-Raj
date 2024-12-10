

// Fonction pour récupérer le token d'accès
const accessToken = getToken();
console.log("Token d'accès :", accessToken); // Log de débogage pour vérifier le token

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + accessToken);

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
};

// Fonction pour formater la date en français
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM entièrement chargé et analysé."); // Log de débogage

    // Récupération des données de l'API
    fetch(apiUrl + "rapports", requestOptions)
        .then(response => {
            console.log("Réponse reçue de l'API :", response); // Log de débogage
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Données reçues :", data); // Log de débogage
            const tableBody = document.getElementById('reportTableBody');

            // Vérifiez que le tableau est bien une liste
            if (!Array.isArray(data)) {
                throw new Error('Format de données incorrect : tableau attendu');
            }

            // Ajout des lignes dynamiques au tableau
            data.forEach(report => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${report.id}</td>
                    <td>${report.animal.name}</td>
                    <td>${report.animal.race.name}</td>
                    <td>${report.state}</td>
                    <td>${report.food}</td>
                    <td>${report.quantity}</td>
                    <td>${formatDate(report.date)}</td>
                    <td>${report.details || 'Aucun détail'}</td>
                `;

                tableBody.appendChild(row);
                console.log("Ligne ajoutée au tableau."); // Log de débogage
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des rapports :', error);

            const tableBody = document.getElementById('reportTableBody');
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center text-danger">Erreur de chargement des rapports.</td>
                </tr>
            `;
        });
});
