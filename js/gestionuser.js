const accessToken = getToken();
const myHeaders = new Headers();
myHeaders.append("Authorization", "bearer " + accessToken);

async function getUserList() {
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl + "admin/users", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP Status: ${response.status}`);
            }
        })
        .then((result) => {
            var tableBody = document.getElementById('userconsuptionTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = "";
            result.forEach(element => {
                showUser(element);
            });
        })
        .catch((error) => {
            alert("Error fetching data, " + error.message);
        });

}

async function addUser() {

    var email = document.getElementById('userMail').value;
    var password = document.getElementById('password').value;
    var name = document.getElementById('userName').value;
    var role = document.getElementById('role').value;

    const userObject = {
        "email": email,
        "password": password,
        "role": role
    };
    if (name != null && name.trim() !== "") {
        userObject["name"] = name;
    }

    const jsonObject = JSON.stringify(userObject);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: jsonObject,
        redirect: "follow"
    };

    fetch(apiUrl + "admin/users", requestOptions)
        .then((response) => {

            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error(`HTTP Status: ${response.status}`);
            }
        })
        .then((result) => {
            showUser(result);
        })
        .catch((error) => {
            alert("Error fetching data, " + error.message);
        });
}

async function deleteUser(userId, row) {

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl + "admin/users/" + userId, requestOptions)
        .then((response) => {
            if (response.status === 204) {
                row.remove();
            } else {
                throw new Error(`HTTP Status: ${response.status}`);
            }
        })
        .catch((error) => {
            alert("Error fetching data, " + error.message);
        });
}



function showUser(user) {
    //creer une nouvelle ligne dans le tableau
    var table = document.getElementById('userconsuptionTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    //ajouter les cellules à la ligne
    var userCell = newRow.insertCell(0);
    var emailCell = newRow.insertCell(1);
    var roleCell = newRow.insertCell(2);
    var actionCell = newRow.insertCell(3); // Cellule pour le bouton "Action"

    //remplir les cellules avec les données
    userCell.textContent = user.name;
    emailCell.textContent = user.email;
    roleCell.textContent = user.role.name;

    //ajouter les boutons de modification à la nouvelle ligne
    var updateBtn = document.createElement('button');
    updateBtn.classList.add('btn', 'btn-success', 'btn-sm', 'me-2');
    updateBtn.textContent = 'Modifier';

    updateBtn.onclick = function () {
        /// TODO 
    };

    actionCell.appendChild(updateBtn);

    //ajouter les boutons de suppression à la nouvelle ligne
    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm',);
    deleteBtn.textContent = 'Supprimer';

    deleteBtn.onclick = function () {
        if (confirm("Voulez-vous supprimer cette entrée")) {
            deleteUser(user.id, newRow);
        }
    };

    actionCell.appendChild(deleteBtn);
}

getUserList();

//fonction pour ajouter un nouvel utilisateur
document.getElementById('addconsumptionTable').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire
    addUser();
});