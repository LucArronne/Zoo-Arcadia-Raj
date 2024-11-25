    // gestion du filtrage
    $('#filterAnimal').on('change', function () {
        const selectedAnimal = $(this).val();
        $('#statisticsTable tr').show(); 

        if (selectedAnimal !== 'all') {
            $('#statisticsTable tr').each(function () {
                const animalName = $(this).find('td').first().text().toLowerCase();
                if (animalName !== selectedAnimal) {
                    $(this).hide(); 
                }
            });
        }
    });