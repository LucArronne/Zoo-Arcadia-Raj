import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/service", "Les Services", "/pages/service.html"),
    new Route("/habitats", "Les Habitats", "/pages/habitats.html"),
    new Route("/habitat-savane", "habitat-savane", "/pages/habitat-savane.html"),
    new Route("/habitat-jungle", "habitat-jungle", "/pages/habitat-jungle.html"),
    new Route("/habitat-marais", "habitat-marais", "/pages/habitat-marais.html"),
    new Route("/Restauration", "restauration", "/pages/restauration.html"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Arcadia";