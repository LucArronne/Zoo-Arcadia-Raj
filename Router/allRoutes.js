import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/service", "Les Services", "/pages/service.html"),
    new Route("/habitats", "Les Habitats", "/pages/habitats.html"),
    new Route("/habitat-savane", "habitat-savane", "/pages/habitat-savane.html"),];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Arcadia";