// Fonction pour valider un avis
function validateReview(button) {
    // Rechercher la ligne du tableau correspondant à l'avis
    let row = button.closest('tr');
    // Message de confirmation
    if (confirm("Voulez-vous vraiment valider cet avis ?")) {
        // Suppression de la ligne du tableau (l'avis validé)
        row.remove();
        console.log("Avis validé.");
        // Requête AJAX pour mettre à jour la base de données peut être ajoutée ici
    }
}

// Fonction pour supprimer un avis
function deleteReview(button) {
    // Rechercher la ligne du tableau correspondant à l'avis
    let row = button.closest('tr');
    // Message de confirmation
    if (confirm("Voulez-vous vraiment supprimer cet avis ?")) {
        // Suppression de la ligne du tableau (l'avis supprimé)
        row.remove();
        console.log("Avis supprimé.");
        // Requête AJAX pour supprimer l'avis de la base de données peut être ajoutée ici
    }
}

// Fonction pour ajouter une nouvelle entrée dans le tableau de consommation alimentaire
document.getElementById('addFoodConsumptionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire

    // Récupérer les valeurs du formulaire
    let foodType = document.getElementById('foodType').value;
    let quantity = document.getElementById('quantity').value; // Correction de 'quantconity'
    let visitDate = document.getElementById('visitDate').value;
    let visitHour = document.getElementById('visitHour').value;

    // Créer une nouvelle ligne dans le tableau
    let table = document.getElementById('consumptionTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    // Ajouter les cellules à la ligne
    let foodCell = newRow.insertCell(0);
    let quantityCell = newRow.insertCell(1);
    let dateCell = newRow.insertCell(2);
    let actionCell = newRow.insertCell(3);

    // Remplir les cellules avec les données
    foodCell.textContent = foodType;
    quantityCell.textContent = quantity + ' kg';
    dateCell.textContent = visitDate + ' à ' + visitHour;

    // Ajouter les boutons de suppression à la nouvelle ligne
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.onclick = function() {
        if (confirm("Voulez-vous vraiment supprimer cette entrée ?")) {
            newRow.remove();
            console.log("Entrée supprimée.");
        }
    };

    actionCell.appendChild(deleteBtn);

    // Réinitialiser le formulaire
    document.getElementById('addFoodConsumptionForm').reset();
});
