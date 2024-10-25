document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupérer les valeurs des champs de formulaire
    var animal = document.getElementById('filterAnimal').value;
    var healthStatus = document.getElementById('healthStatus').value;
    var vetNotes = document.getElementById('vetNotes').value;
    var habitat = document.getElementById('filterHabitat').value;
    var vetNotesHabitat = document.getElementById('vetNotesHabitat').value;

    // Récupérer le tableau cible et insérer une nouvelle ligne
    var table = document.getElementById('reportTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    // Ajouter des cellules à la ligne
    var animalCell = newRow.insertCell(0);
    var healthStatusCell = newRow.insertCell(1);
    var vetNotesCell = newRow.insertCell(2);
    var habitatCell = newRow.insertCell(3);
    var vetNotesHabitatCell = newRow.insertCell(4);
    var actionCell = newRow.insertCell(5);

    // Remplir les cellules avec les données
    animalCell.textContent = animal;
    healthStatusCell.textContent = healthStatus;
    vetNotesCell.textContent = vetNotes;
    habitatCell.textContent = habitat;
    vetNotesHabitatCell.textContent = vetNotesHabitat;

    // Ajouter le bouton de suppression  
    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.onclick = function() {
        if (confirm("Voulez-vous vraiment supprimer cet avis ?")) {
            newRow.remove();
            console.log("Avis supprimé.");
        }
    };

    actionCell.appendChild(deleteBtn);

    // Réinitialiser uniquement le formulaire de compte rendu
    document.getElementById('reportForm').reset();
});
