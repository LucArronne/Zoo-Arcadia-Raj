import Route from "./Route.js";

export const allRoutes = [
    // Routes accessibles à tout le monde
    new Route("/", "Accueil", "/Pages/home.html", "/js/home.js", ["disconnected"]),
    new Route("/service", "Les Services", "/Pages/service.html", "/js/service.js", ["disconnected"]),
    new Route("/habitats", "Les Habitats", "/Pages/habitats.html", "/js/habitats.js", ["disconnected"]),
    new Route("/habitat-savane", "habitat-savane", "/Pages/habitat-savane.html", "/js/habitat-savane.js", ["disconnected"]),
    new Route("/habitat-jungle", "habitat-jungle", "/Pages/habitat-jungle.html", "/js/habitat-jungle.js", ["disconnected"]),
    new Route("/habitat-marais", "habitat-marais", "/Pages/habitat-marais.html", "/js/habitat-marais.js", ["disconnected"]),
    new Route("/restauration", "restauration", "/Pages/restauration.html", [], ["disconnected"]),
    new Route("/petit-train", "petit-train", "/Pages/petit-train.html", [], ["disconnected"]),
    new Route("/guide", "guide", "/Pages/guide.html", [], ["disconnected"]),
    new Route("/connexion", "connexion", "/Pages/connexion.html", "/js/connexion.js", ["disconnected"]),
    new Route("/avis", "avis", "/Pages/avis.html", "/js/avis.js", ["disconnected"]),
    new Route("/contact", "contact", "/Pages/contact.html", "/js/contact.js", ["disconnected"]),
    new Route("/habitatid", "habitatid", "/Pages/habitatid.html", "/js/habitatid.js", ["disconnected"]),
    new Route("/animal-rapport", "animal-rapport", "/Pages/animal-rapport.html", "/js/animal-rapport.js", ["disconnected"]),

    // Routes réservées aux administrateurs (seulement accessibles par les admins)
    new Route("/statistiques", "statistiques", "/Pages/statistiques.html", "/js/statistiques.js", ["admin"]),
    new Route("/gestionuser", "gestionuser", "/Pages/gestionuser.html", "/js/gestionuser.js", ["admin"]),
    new Route("/compteRendu", "compteRendu", "/Pages/compteRendu.html", "/js/compteRendu.js", ["admin"]),
    new Route("/galerie", "galerie", "/Pages/galerie.html", [], ["admin"]),
    new Route("/rapportEmployeAdmin", "rapportEmployeAdmin", "/Pages/rapportEmployeAdmin.html", "/js/rapportEmployeAdmin.js", ["admin"]),
    
    // Routes réservées aux employés
    new Route("/user2", "user2", "/Pages/user2.html", "/js/user2.js", ["employee"]),
    new Route("/alimentEmploye", "alimentEmploye", "/Pages/alimentEmploye.html", "/js/alimentEmploye.js", ["employee"]),
    
    // Routes vétérinaire
    new Route("/veterinaire", "veterinaire", "/Pages/veterinaire.html", "/js/veterinaire.js", ["veternary", "admin"]),

    // Autres routes
    new Route("/linkuser", "linkuser", "/Pages/linkuser.html", [], ["admin"]),
];

export const websiteName = "Arcadia";
