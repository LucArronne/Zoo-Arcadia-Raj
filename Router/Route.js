export default class Route { 
  constructor(url, title, pathHtml, pathJS = "", roles = []) {
      this.url = url;
      this.title = title;
      this.pathHtml = pathHtml;
      this.pathJS = pathJS;
      this.roles = roles;  // Liste des rôles autorisés à accéder à la route
  }
}