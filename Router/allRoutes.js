import Route from "./Route.js";

export const allRoutes = [
    // Routes accessibles à tout le monde
    new Route("/", "Accueil", "/Pages/home.html", "/js/home.js", ["disconnected", "connected"]),
    new Route("/service", "Les Services", "/Pages/service.html", "/js/service.js", ["disconnected"]),
    new Route("/habitats", "Les Habitats", "/Pages/habitats.html", "/js/habitats.js", ["disconnected"]),
    new Route("/habitat-savane", "habitat-savane", "/Pages/habitat-savane.html", "/js/habitat-savane.js", ["disconnected"]),
    new Route("/habitat-jungle", "habitat-jungle", "/Pages/habitat-jungle.html", "/js/habitat-jungle.js", ["disconnected"]),
    new Route("/habitat-marais", "habitat-marais", "/Pages/habitat-marais.html", "/js/habitat-marais.js", ["disconnected"]),
    new Route("/restauration", "restauration", "/Pages/restauration.html", ["disconnected"]),
    new Route("/petit-train", "petit-train", "/Pages/petit-train.html", ["disconnected"]),
    new Route("/guide", "guide", "/Pages/guide.html", ["disconnected"]),
    new Route("/connexion", "connexion", "/Pages/connexion.html", "/js/connexion.js", ["disconnected"]),
    new Route("/avis", "avis", "/Pages/avis.html", "/js/avis.js", ["disconnected"]),
    new Route("/contact", "contact", "/Pages/contact.html", "/js/contact.js", ["disconnected"]),

    // Routes réservées aux administrateurs (seulement accessible par les admins)
    new Route("/gestionuser", "gestionuser", "/Pages/gestionuser.html", "/js/gestionuser.js", ["admin"]),
    
    // Routes réservées aux employés
    new Route("/employé", "employé", "/Pages/employé.html", "/js/employé/employé.js", ["employee"]),
    
    // Routes accessibles aux utilisateurs connectés ou admin
    new Route("/galerie", "galerie", "/Pages/galerie.html", [], ["connected", "admin"]),
    new Route("/statistiques", "statistiques", "/Pages/statistiques.html", "/js/statistiques.js", ["admin"]),
    new Route("/compteRendu", "compteRendu", "/Pages/compteRendu.html", "/js/compteRendu.js", ["admin"]),
    
    // Page réservée à l'admin pour la gestion des utilisateurs (donc accessible uniquement par un admin)
    new Route("/user2", "user2", "/Pages/user2.html", "/js/user2.js", ["admin"]),
    
    // Routes vétérinaire
    new Route("/veterinaire", "veterinaire", "/Pages/veterinaire.html", "/js/veterinaire.js", ["veterinary", "admin"]),

    // Autres routes
    new Route("/linkuser", "linkuser", "/Pages/linkuser.html", [], ["admin"]),
];

export const websiteName = "Arcadia";
