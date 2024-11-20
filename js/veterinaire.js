document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupérer les valeurs des champs de formulaire
    let animal = document.getElementById('filterAnimal').value;
    let healthStatus = document.getElementById('healthStatus').value;
    let vetNotes = document.getElementById('vetNotes').value;
    let habitat = document.getElementById('filterHabitat').value;
    let vetNotesHabitat = document.getElementById('vetNotesHabitat').value;

    // Récupérer le tableau cible et insérer une nouvelle ligne
    let table = document.getElementById('reportTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    // Ajouter des cellules à la ligne
    let animalCell = newRow.insertCell(0);
    let healthStatusCell = newRow.insertCell(1);
    let vetNotesCell = newRow.insertCell(2);
    let habitatCell = newRow.insertCell(3);
    let vetNotesHabitatCell = newRow.insertCell(4);
    let actionCell = newRow.insertCell(5);

    // Remplir les cellules avec les données
    animalCell.textContent = animal;
    healthStatusCell.textContent = healthStatus;
    vetNotesCell.textContent = vetNotes;
    habitatCell.textContent = habitat;
    vetNotesHabitatCell.textContent = vetNotesHabitat;

    // Ajouter le bouton de suppression  
    let deleteBtn = document.createElement('button');
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
