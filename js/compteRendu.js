// Token d'accès et options pour les requêtes
const accessToken = getToken();
const myHeaders = new Headers();
myHeaders.append("Authorization", "bearer " + accessToken);

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

// Fonction pour récupérer les animaux via l'API
const fetchAnimals = async () => {
    try {
        const response = await fetch('https://127.0.0.1:8000/api/admin/animals/races', requestOptions);
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error("Format de réponse invalide pour les animaux");
        }
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des animaux:', error);
        throw error;
    }
};

// Fonction pour afficher les animaux dans le tableau
const displayAnimals = (animals) => {
    const animalListContainer = document.getElementById('animalList');
    animalListContainer.innerHTML = ''; // Vider le contenu précédent

    if (animals.length === 0) {
        animalListContainer.innerHTML = '<tr><td colspan="2" class="text-center">Aucun animal trouvé.</td></tr>';
        return;
    }

    animals.forEach(animal => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHTML(animal.id)}</td>
            <td>${escapeHTML(animal.name)}</td>
        `;
        animalListContainer.appendChild(row);
    });
};

// Fonction de récupération des rapports
const fetchReports = async () => {
    try {
        const response = await fetch('https://127.0.0.1:8000/api/rapports', requestOptions);
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error("Format de réponse invalide pour les rapports");
        }
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des rapports:', error);
        throw error;
    }
};

// Fonction d'affichage des rapports dans le tableau
const displayReports = (reports) => {
    const reportContainer = document.getElementById('reportContainer');
    reportContainer.innerHTML = ''; // Clear existing content

    if (reports.length === 0) {
        reportContainer.innerHTML = '<tr><td colspan="11" class="text-center">Aucun rapport disponible.</td></tr>';
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
            <td>${escapeHTML(report.details || 'Aucun détail fourni')}</td>
            <td>${escapeHTML(report.user?.id)}</td>
            <td>${escapeHTML(report.user?.email)}</td>
            <td>${escapeHTML(report.user?.role?.name)}</td>
            <td>${escapeHTML(report.animal?.name)}</td>
            <td>${escapeHTML(report.animal?.race?.name)}</td>
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

// Récupérer les animaux et les rapports au démarrage
fetchAnimals()
    .then(displayAnimals)
    .catch(error => console.error('Erreur lors de la récupération des animaux:', error));

fetchReports()
    .then(displayReports)
    .catch(error => console.error('Erreur lors de la récupération des rapports:', error));
