
const accessToken = getToken(); // Fonction pour récupérer le token d'accès

const myHeaders = new Headers();
myHeaders.append("Authorization", "bearer " + accessToken);

// Fonction pour récupérer les statistiques des visites
async function getVisitStatistics() {
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl + "admin/animals/visit", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP Status: ${response.status}`);
            }
        })
        .then((result) => {
            let tableBody = document.getElementById('visitStatisticsTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = "";
            result.forEach(element => {
                showVisitStatistics(element);
            });
        })
        .catch((error) => {
            alert("Error fetching data, " + error.message);
        });
}

// Fonction pour afficher une ligne de statistiques dans le tableau
function showVisitStatistics(stat) {
    let table = document.getElementById('visitStatisticsTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    let animalNameCell = newRow.insertCell(0);
    let visitCountCell = newRow.insertCell(1);
    let actionCell = newRow.insertCell(2); // Cellule pour le bouton de suppression

    animalNameCell.textContent = stat.animalName;
    visitCountCell.textContent = stat.visitCount;

    // Ajouter le bouton de suppression
    addDeleteButton(stat, actionCell);
}

// Fonction pour ajouter un bouton de suppression dans le tableau des statistiques
function addDeleteButton(stat, cell) {
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteBtn.textContent = 'Supprimer';

    deleteBtn.onclick = function () {
        if (confirm("Voulez-vous supprimer cette statistique ?")) {
            deleteVisitStatistic(stat.id, cell.parentNode);
        }
    };

    cell.appendChild(deleteBtn);
}

// Fonction pour supprimer une statistique de visite
async function deleteVisitStatistic(statId, row) {
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl + "admin/animals/visit/" + statId, requestOptions)
        .then((response) => {
            if (response.status === 204) {
                row.remove();
            } else {
                throw new Error(`HTTP Status: ${response.status}`);
            }
        })
        .catch((error) => {
            alert("Error deleting data, " + error.message);
        });
}

// Fonction pour ajouter de nouvelles statistiques (si applicable, par exemple si vous voulez ajouter des statistiques manuellement)
async function addVisitStatistics() {
    let animalId = document.getElementById('animalId').value;
    let visitCount = document.getElementById('visitCount').value;

    const statObject = {
        "animalId": animalId,
        "visitCount": visitCount
    };

    const jsonObject = JSON.stringify(statObject);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: jsonObject,
        redirect: "follow"
    };

    fetch(apiUrl + "admin/animals/visit", requestOptions)
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error(`HTTP Status: ${response.status}`);
            }
        })
        .then((result) => {
            showVisitStatistics(result);
        })
        .catch((error) => {
            alert("Error adding data, " + error.message);
        });
}

// Récupérer les statistiques lors du chargement de la page
getVisitStatistics();

// Événement pour ajouter une nouvelle statistique (si applicable)
document.getElementById('addVisitForm').addEventListener('submit', function (event) {
    event.preventDefault(); 
    addVisitStatistics();
});
