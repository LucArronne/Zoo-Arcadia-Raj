
    // Gestion de la modale de suppression
    $('#deleteModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Bouton qui déclenche la modale
        var username = button.data('username'); // Extraire l'email de l'utilisateur
        var modal = $(this);
        modal.find('#deleteUser').text(username);

        // Gérer la suppression lorsque l'utilisateur confirme
        $('#confirmDelete').off('click').on('click', function () {
            // Effectuer l'action de suppression ici (AJAX ou autre logique)
            console.log("Suppression de l'utilisateur : " + username);
            modal.modal('hide');
        });
    });

    // Gestion du formulaire d'ajout/modification d'utilisateur
    $('#userForm').on('submit', function (event) {
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        var role = $('#role').val();

        // Effectuer l'action d'ajout/modification ici (AJAX ou autre logique)
        console.log("Utilisateur ajouté/modifié : " + username + ", rôle : " + role);

        // Réinitialiser et fermer la modale
        $(this).trigger('reset');
        $('#userModal').modal('hide');
    });

