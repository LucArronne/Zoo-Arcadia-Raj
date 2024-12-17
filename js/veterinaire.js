
const accessToken = getToken(); // Assurez-vous que cette fonction retourne un token valide
const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + accessToken);
myHeaders.append("Content-Type", "application/json");

// Options de requête
const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

// Fonction pour récupérer les animaux via /api/home/animals
const fetchAnimals = async () => {
    try {
        const response = await fetch(apiUrl + "home/animals", requestOptions);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log("Données récupérées :", data); // Debug
        if (!Array.isArray(data)) {
            throw new Error("Format de réponse invalide pour les animaux");
        }
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des animaux:', error.message);
        throw error;
    }
};

// Fonction pour afficher les animaux dans la liste déroulante
const displayAnimals = (animals) => {
    const animalSelect = document.getElementById('animalId');
    animalSelect.innerHTML = ''; // Nettoyage des anciennes options

    animals.forEach(animal => {
        const option = document.createElement('option');
        option.value = animal.id;
        option.textContent = `${animal.name} - ${animal.race.name} (ID: ${animal.id})`;
      
        animalSelect.appendChild(option);
    });
};

// Fonction pour récupérer les rapports
const fetchReports = async () => {
    try {
        const response = await fetch(apiUrl + "rapports", requestOptions);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log("Rapports récupérés :", data); // Debug
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des rapports:', error.message);
        throw error;
    }
};

// Fonction pour afficher les rapports dans le tableau
const displayReports = (reports) => {
    const reportContainer = document.getElementById('reportContainer');
    reportContainer.innerHTML = '';

    if (reports.length === 0) {
        reportContainer.innerHTML = '<tr><td colspan="12" class="text-center">Aucun rapport disponible.</td></tr>';
        return;
    }

    reports.forEach(report => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHTML(report.id)}</td>
            <td>${escapeHTML(report.state)}</td>
            <td>${escapeHTML(report.food)}</td>
            <td>${escapeHTML(report.quantity)}</td>
            <td>${new Date(report.date).toLocaleDateString()}</td>
            <td>${escapeHTML(report.details || 'Aucun détail')}</td>
            <td>${escapeHTML(report.user?.id)}</td>
            <td>${escapeHTML(report.user?.email)}</td>
            <td>${escapeHTML(report.user?.role?.name)}</td>
            <td>${escapeHTML(report.animal?.id)}</td>
            <td>${escapeHTML(report.animal?.name)}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteReport(${report.id})">Supprimer</button>
            </td>
        `;
        reportContainer.appendChild(row);
    });
};

// Fonction pour échapper les caractères HTML
const escapeHTML = (str) => {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
};

// Fonction d'ajout d'un rapport
const addReport = async (animalId, reportData) => {
    try {
        const response = await fetch(`${apiUrl}rapports/${animalId}`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(reportData)
        });
        const data = await response.json();
        console.log("Rapport ajouté :", data);
        fetchReports().then(displayReports);
    } catch (error) {
        console.error("Erreur lors de l'ajout du rapport:", error.message);
    }
};

// Gestion de l'ajout via le formulaire
document.getElementById('addReportForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const animalId = document.getElementById('animalId').value;
    const state = document.getElementById('state').value;
    const food = document.getElementById('food').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const details = document.getElementById('details').value;

    const reportData = {
        state,
        food,
        quantity,
        date: new Date().toISOString(),
        details
    };

    addReport(animalId, reportData);
});

// Initialisation : récupération et affichage des animaux et rapports
fetchAnimals()
    .then(displayAnimals)
    .catch(error => console.error(error));

fetchReports()
    .then(displayReports)
    .catch(error => console.error(error));
