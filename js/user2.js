
function validateReview(button) {
    
    let row = button.closest('tr');
  
    if (confirm("Voulez-vous vraiment valider cet avis ?")) {
      
        row.remove();
        console.log("Avis validé.");
      
    }
}


function deleteReview(button) {

    let row = button.closest('tr');

    if (confirm("Voulez-vous vraiment supprimer cet avis ?")) {

        row.remove();
        console.log("Avis supprimé.");
        
    }
}


document.getElementById('addFoodConsumptionForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    let foodType = document.getElementById('foodType').value;
    let quantity = document.getElementById('quantity').value; 
    let visitDate = document.getElementById('visitDate').value;
    let visitHour = document.getElementById('visitHour').value;


    let table = document.getElementById('consumptionTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();


    let foodCell = newRow.insertCell(0);
    let quantityCell = newRow.insertCell(1);
    let dateCell = newRow.insertCell(2);
    let actionCell = newRow.insertCell(3);

    foodCell.textContent = foodType;
    quantityCell.textContent = quantity + ' kg';
    dateCell.textContent = visitDate + ' à ' + visitHour;

    
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
