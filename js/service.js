const apiUrl = 'https://127.0.0.1:8000/api/home/services'; 

 const requestOptions = {
     method: 'GET',  
     headers: { 
         'Content-Type': 'application/json' 
    
     }
 };

 // Fonction pour récupérer et afficher les services
 function loadServices() {
     fetch(apiUrl, requestOptions)
         .then(response => {
             if (!response.ok) {
                 throw new Error('Erreur réseau');
             }
             return response.json();
         })
         .then(services => {
             const serviceList = document.getElementById('service-list');
          
             serviceList.innerHTML = '';

             services.forEach(service => {
              
                 const serviceCard = `
                     <article class="service-card">
                         <img src="${service.image}" alt="${service.image}">
                         <h3 class="overlay-text-container text-white">${service.name}</h3>
                         <p>${service.description}</p>
                         <a href="${service.link}" class="btn btn-secondary">Voir les Détails</a>
                     </article>
                 `;
                 serviceList.innerHTML += serviceCard;
             });
         })
         .catch(error => {
             console.error('Erreur lors de la récupération des services:', error);
             document.getElementById('service-list').innerHTML = '<div class="alert alert-danger">Erreur lors de la récupération des services</div>';
         });
 }

 // Charger les services au démarrage de la page
 window.onload = loadServices;

