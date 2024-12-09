const accessToken = getToken(); 

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + accessToken);
myHeaders.append("Content-Type", "application/json");

// Fonction pour récupérer la liste des animaux
async function getAnimalList() {
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl + "home/animals", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP Status: ${response.status}`);
            }
        })
        .then((result) => {
            let tableBody = document.getElementById('animalTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ""; // Vide le tableau avant d'ajouter les nouvelles données
            result.forEach(animal => {
                showAnimal(animal);
                getFoodsByAnimal(animal.id); // Récupère les aliments pour chaque animal
            });
        })
        .catch((error) => {
            alert("Erreur lors de la récupération des animaux, " + error.message);
        });
}

// Fonction pour afficher un animal dans le tableau
function showAnimal(animal) {
    let table = document.getElementById('animalTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    let idCell = newRow.insertCell(0);
    let nameCell = newRow.insertCell(1);
    let raceCell = newRow.insertCell(2);
    let actionCell = newRow.insertCell(3);

    idCell.textContent = animal.id;
    nameCell.textContent = animal.name;
    raceCell.textContent = animal.race.name;

    let foodListContainer = document.createElement('div');
    foodListContainer.id = `food-list-${animal.id}`;
    actionCell.appendChild(foodListContainer);
}

// Fonction pour récupérer la liste des aliments pour un animal spécifique
async function getFoodsByAnimal(animalId) {
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl + `foods/animal/${animalId}`, requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP Status: ${response.status}`);
            }
        })
        .then((result) => {
            displayFoods(result, animalId);
        })
        .catch((error) => {
            alert("Erreur lors de la récupération des aliments, " + error.message);
        });
}

// Fonction pour afficher les aliments 
function displayFoods(foods, animalId) {
    let foodListContainer = document.getElementById(`food-list-${animalId}`);
    foodListContainer.innerHTML = "";

    if (foods.length === 0) {
        let noFoodMessage = document.createElement('p');
        noFoodMessage.textContent = "Aucun aliment disponible pour cet animal.";
        foodListContainer.appendChild(noFoodMessage);
    } else {
        foods.forEach(food => {
            const foodItem = document.createElement('div');
            foodItem.classList.add('food-item');

            const foodName = document.createElement('span');
            foodName.textContent = `${food.name} - Quantité: ${food.quantity}`;
            foodItem.appendChild(foodName);

            let updateFoodBtn = document.createElement('button');
            updateFoodBtn.classList.add('btn', 'btn-warning', 'btn-sm', 'me-2');
            updateFoodBtn.textContent = 'Modifier';

            updateFoodBtn.onclick = function () {
                openEditModal(animalId, food);
            };

            foodItem.appendChild(updateFoodBtn);
            foodListContainer.appendChild(foodItem);
        });
    }
}

// modale
function openEditModal(animalId, food) {
    const modal = new bootstrap.Modal(document.getElementById('editModal')); // Initialisation de la modale Bootstrap
    const modalFoodName = document.getElementById('modalFoodName');
    const modalFoodQuantity = document.getElementById('modalFoodQuantity');
    const saveChangesBtn = document.getElementById('saveChangesBtn');

    // Pré-remplir
    modalFoodName.value = food.name;
    modalFoodQuantity.value = food.quantity;

    // Afficher la modale
    modal.show();

    // enregistrer les modifications
    saveChangesBtn.onclick = function () {
        const updatedFoodData = {
            id: food.id,
            name: modalFoodName.value,
            quantity: parseInt(modalFoodQuantity.value, 10),
        };

        updateFood(animalId, updatedFoodData); 

        // Fermer la modale après sauvegarde
        modal.hide();
    };
}

function updateFood(animalId, updatedFoodData) {
    // Préparez les données avec validation
    if (!updatedFoodData.name || updatedFoodData.name.trim() === "") {
        alert("Le nom de l'aliment est requis.");
        return;
    }
    if (!Number.isInteger(updatedFoodData.quantity) || updatedFoodData.quantity <= 0) {
        alert("La quantité doit être un nombre entier positif.");
        return;
    }

    const payload = {
        name: updatedFoodData.name,
        quantity: updatedFoodData.quantity,
        date: new Date().toISOString() // Date actuelle
    };

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: "follow"
    };

    fetch(apiUrl + `foods/animal/${animalId}`, requestOptions)
        .then((response) => {
            if (response.ok) {
                alert("Aliment mis à jour avec succès !");
                getFoodsByAnimal(animalId); // Recharge la liste des aliments
            } else {
                return response.json().then((data) => {
                    console.error("Erreur API :", data); 
                    throw new Error(data.message || `Erreur: ${response.status}`);
                });
            }
        })
        .catch((error) => {
            alert("Erreur lors de la mise à jour de l'aliment : " + error.message);
        });
}

function displayFoods(foods, animalId) {
    let foodListContainer = document.getElementById(`food-list-${animalId}`);
    foodListContainer.innerHTML = "";

    if (foods.length === 0) {
        let noFoodMessage = document.createElement('p');
        noFoodMessage.textContent = "Aucun aliment disponible pour cet animal.";
        foodListContainer.appendChild(noFoodMessage);
    } else {
        foods.forEach(food => {
            const foodItem = document.createElement('div');
            foodItem.classList.add('food-item');

            const foodName = document.createElement('span');
            foodName.textContent = `${food.name} - Quantité: ${food.quantity}`;
            foodItem.appendChild(foodName);

            // Ajouter la date de mise à jour de l'aliment
            const foodDate = document.createElement('span');
            foodDate.classList.add('food-date');
            foodDate.textContent = ` (Mis à jour le: ${new Date(food.date).toLocaleString()})`;
            foodItem.appendChild(foodDate);

            let updateFoodBtn = document.createElement('button');
            updateFoodBtn.classList.add('btn', 'btn-warning', 'btn-sm', 'me-2');
            updateFoodBtn.textContent = 'Modifier';

            updateFoodBtn.onclick = function () {
                openEditModal(animalId, food);
            };

            foodItem.appendChild(updateFoodBtn);
            foodListContainer.appendChild(foodItem);
        });
    }
}



getAnimalList();
