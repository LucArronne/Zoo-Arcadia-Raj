
    // Fonction pour valider un avis
    function validateReview(button) {
        // Rechercher la ligne du tableau correspondant à l'avis
        var row = button.closest('tr');
        // Message de confirmation
        if (confirm("Voulez-vous vraiment valider cet avis ?")) {
            // Suppression de la ligne du tableau (l'avis validé)
            row.remove();
            console.log("Avis validé.");
            // Vous pouvez envoyer une requête AJAX ici pour marquer l'avis comme validé dans la base de données.
        }
    }

    // Fonction pour supprimer un avis
    function deleteReview(button) {
        // Rechercher la ligne du tableau correspondant à l'avis
        var row = button.closest('tr');
        // Message de confirmation
        if (confirm("Voulez-vous vraiment supprimer cet avis ?")) {
            // Suppression de la ligne du tableau (l'avis supprimé)
            row.remove();
            console.log("Avis supprimé.");
            // Vous pouvez envoyer une requête AJAX ici pour supprimer l'avis de la base de données.
        }
    }


     // Fonction pour ajouter une nouvelle entrée dans le tableau de consommation alimentaire
     document.getElementById('addFoodConsumptionForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire

        // Récupérer les valeurs du formulaire
        var foodType = document.getElementById('foodType').value;
        var quantity = document.getElementById('quantconity').value;
        var visitDate = document.getElementById('visitDate').value;
        var visitHour = document.getElementById('visitHour').value;

        // Créer une nouvelle ligne dans le tableau
        var table = document.getElementById('consumptionTable').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow();

        // Ajouter les cellules à la ligne
        var foodCell = newRow.insertCell(0);
        var quantityCell = newRow.insertCell(1);
        var dateCell = newRow.insertCell(2);
        var actionCell = newRow.insertCell(3);

        // Remplir les cellules avec les données
        foodCell.textContent = foodType;
        quantityCell.textContent = quantity + ' kg';
        dateCell.textContent = visitDate + ' à ' + visitHour;

        // Ajouter les boutons de suppression à la nouvelle ligne
        var deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.onclick = function() {
            if (confirm("Voulez-vous vraiment supprimer cette entrée ?")) {
                newRow.remove();
            }
        };

        actionCell.appendChild(deleteBtn);

        // Réinitialiser le formulaire
        document.getElementById('addFoodConsumptionForm').reset();
    });