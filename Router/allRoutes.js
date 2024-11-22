import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/Pages/home.html", "/js/home.js"),
    new Route("/service", "Les Services", "/Pages/service.html", "/js/service.js"),

    new Route("/habitats", "Les Habitats", "/Pages/habitats.html"),
    new Route("/habitat-savane", "habitat-savane", "/Pages/habitat-savane.html"),
    new Route("/habitat-jungle", "habitat-jungle", "/Pages/habitat-jungle.html"),
    new Route("/habitat-marais", "habitat-marais", "/Pages/habitat-marais.html"),
    new Route("/restauration", "restauration", "/Pages/restauration.html"),
    new Route("/petit-train", "petit-train", "/Pages/petit-train.html"),
    new Route("/guide", "guide", "/Pages/guide.html"),
    new Route("/connexion", "connexion", "/Pages/connexion.html", "/js/connexion.js"),
    new Route("/avis", "avis", "/Pages/avis.html", "/js/avis.js"),
    new Route("/contact", "contact", "/Pages/contact.html", "/js/contact.js"),
    new Route("/gestionuser", "gestionuser", "/Pages/gestionuser.html", "/js/gestionuser.js"),
    new Route("/employé", "employé", "/Pages/employé.html", "/js/employé/employé.js"),
    new Route("/galerie", "galerie", "/Pages/galerie.html",),
    new Route("/statistiques", "statistiques", "/Pages/statistiques.html", "/js/statistiques.js"),
    new Route("/compteRendu", "compteRendu", "/Pages/compteRendu.html", "/js/compteRendu.js"),
    new Route("/user2", "user2", "/Pages/user2.html", "/js/user2.js"),
    new Route("/linkuser", "linkuser", "/Pages/linkuser.html"),
    new Route("/veterinaire", "veterinaire", "/Pages/veterinaire.html", "/js/veterinaire.js"),
    new Route("/statistiques", "/Pages/statistiques.html", "/js/statistiques.js"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Arcadia";