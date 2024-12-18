const accessToken = getToken();
const myHeaders = new Headers();
myHeaders.append("Authorization", "bearer " + accessToken);

// Fonction pour récupérer les avis
async function getReviews() {
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl + "comments", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP Status: ${response.status}`);
            }
        })
        .then((result) => {
            let tableBody = document.getElementById('reviewsTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ""; // Vide le tableau avant d'ajouter les nouvelles données
            result.forEach(comment => {
                showReview(comment);
            });
        })
        .catch((error) => {
            alert("Erreur lors de la récupération des avis, " + error.message);
        });
}

// Fonction pour afficher un avis
function showReview(review) {
    let table = document.getElementById('reviewsTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    // Colonnes de données
    let textCell = newRow.insertCell(0);
    let pseudoCell = newRow.insertCell(1);
    let statusCell = newRow.insertCell(2);
    let actionCell = newRow.insertCell(3);

    textCell.textContent = review.text;
    pseudoCell.textContent = review.pseudo;

    // Indiquer si le commentaire est validé ou non
    statusCell.textContent = review.visible ? "Validé" : "Non validé";
    statusCell.classList.add(review.visible ? "text-success" : "text-danger");

    // Bouton d'action
    let validateBtn = document.createElement('button');
    validateBtn.classList.add('btn', 'btn-primary', 'btn-sm', 'me-2');
    validateBtn.textContent = review.visible ? 'Invalider' : 'Valider';
    validateBtn.onclick = function () {
        validateReview(review.id, statusCell, validateBtn);
    };
    actionCell.appendChild(validateBtn);

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteBtn.textContent = 'Supprimer';

    deleteBtn.onclick = function () {
        if (confirm("Voulez-vous supprimer cet avis ?")) {
            deleteReview(review.id, newRow);
        }
    };

    actionCell.appendChild(deleteBtn);
}

// Fonction pour valider un commentaire
async function validateReview(reviewId, statusCell, updateButton) {
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`${apiUrl}comments/${reviewId}`, requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP Status: ${response.status}`);
            }
        })
        .then((review) => {
            statusCell.textContent = review.visible ? "Validé" : "Non validé";
            statusCell.className = '';
            statusCell.classList.add(review.visible ? "text-success" : "text-danger");
            updateButton.textContent = review.visible ? 'Invalider' : 'Valider';

        })
        .catch((error) => {
            alert("Erreur lors de la validation de l'avis, " + error.message);
        });
}

// Fonction pour supprimer un avis
async function deleteReview(reviewId, row) {
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`${apiUrl}comments/${reviewId}`, requestOptions)
        .then((response) => {
            if (response.status === 204) {
                row.remove();
            } else {
                throw new Error(`HTTP Status: ${response.status}`);
            }
        })
        .catch((error) => {
            alert("Erreur lors de la suppression de l'avis, " + error.message);
        });
}

// Chargement initial des avis
getReviews();
