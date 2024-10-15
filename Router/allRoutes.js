import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/service", "Les Services", "/pages/service.html"),
    new Route("/habitats", "Les Habitats", "/pages/habitats.html"),
    new Route("/habitat-savane", "habitat-savane", "/pages/habitat-savane.html"),
    new Route("/habitat-jungle", "habitat-jungle", "/pages/habitat-jungle.html"),
    new Route("/habitat-marais", "habitat-marais", "/pages/habitat-marais.html"),
    new Route("/restauration", "restauration", "/pages/restauration.html"),
    new Route("/petit-train", "petit-train", "/pages/petit-train.html"),
    new Route("/guide", "guide", "/pages/guide.html"),
    new Route("/connexion", "connexion", "/pages/connexion.html"),
    new Route("/avis", "avis", "/pages/avis.html"),
    new Route("/contact", "contact", "/pages/contact.html"),
    new Route("/gestionuser", "gestionuser", "/pages/gestionuser.html"),
    new Route("/employé", "employé", "/pages/employé.html"),
    new Route("/veterinaire", "veterinaire", "/pages/veterinaire.html"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Arcadia";