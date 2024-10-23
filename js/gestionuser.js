//fonction pour ajouter un nouvel utilisateur
document.getElementById('addconsumptionTable').addEventListener('submit', function(event) {
event.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire

//recuperer les valeurs du formulaire
var userName = document.getElementById('userName').value;
var password = document.getElementById('password').value;
var role = document.getElementById('role').value;

//creer une nouvelle ligne dans le tableau
var table = document.getElementById('userconsuptionTable').getElementsByTagName('tbody')[0];
var newRow = table.insertRow();

//ajouter les cellules à la ligne
var userCell = newRow.insertCell(0);
var passwordCell = newRow.insertCell(1);
var roleCell = newRow.insertCell(2);
var actionCell = newRow.insertCell(3); // Cellule pour le bouton "Action"

//remplir les cellules avec les données
userCell.textContent = userName;
passwordCell.textContent = password;
roleCell.textContent = role;

//ajouter les boutons de suppression à la nouvelle ligne
var deleteBtn = document.createElement('button');
deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
deleteBtn.textContent = 'Supprimer';

   deleteBtn.onclick = function() {
    if (confirm("voulez-vous supprimer cette entrée")){
        newRow.remove();

    }
};

actionCell.appendChild(deleteBtn);

document.getElementById('addconsumptionTable').reset();
});