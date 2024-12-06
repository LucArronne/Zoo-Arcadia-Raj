
const accessToken = getToken();
const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + accessToken);

// Fonction pour récupérer la liste des aliments d'un animal
async function getAnimalFoodList(animalId) {
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`${apiUrl}foods/animal/${animalId}`, requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP Status: ${response.status}`);
            }
        })
        .then((result) => {
            let tableBody = document.getElementById('foodTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ""; // Vide le tableau avant d'ajouter les nouvelles données
            result.forEach(food => {
                showFood(food);
            });
        })
        .catch((error) => {
            alert("Erreur lors de la récupération des aliments, " + error.message);
        });
}

// Fonction pour afficher un aliment
function showFood(food) {
    let table = document.getElementById('foodTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    // Colonnes de données
    let nameCell = newRow.insertCell(0);
    let quantityCell = newRow.insertCell(1);
    let dateCell = newRow.insertCell(2);
    let userCell = newRow.insertCell(3);
    let actionCell = newRow.insertCell(4);

    nameCell.textContent = food.name;
    quantityCell.textContent = food.quantity;
    dateCell.textContent = new Date(food.date).toLocaleString();
    userCell.textContent = `${user.id.email} (${user.id.email})`;

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteBtn.textContent = 'Supprimer';

    deleteBtn.onclick = function () {
        if (confirm("Voulez-vous supprimer cet aliment ?")) {
            deleteFood(food.id, newRow);
        }
    };

    actionCell.appendChild(deleteBtn);
}

// Fonction pour supprimer un aliment
async function deleteFood(foodId, row) {
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`${apiUrl}foods/${foodId}`, requestOptions)
        .then((response) => {
            if (response.status === 204) {
                row.remove();
            } else {
                throw new Error(`HTTP Status: ${response.status}`);
            }
        })
        .catch((error) => {
            alert("Erreur lors de la suppression de l'aliment, " + error.message);
        });
}

// Chargement initial des aliments pour un animal spécifique (remplacez `1` par l'ID de l'animal)
getAnimalFoodList(1);
